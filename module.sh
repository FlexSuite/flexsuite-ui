#!/bin/bash

echo "**********************************************************"
echo "*                                                        *"
echo "*     Gerenciador de Sparse Checkout                     *"
echo "*                                                        *"
echo "**********************************************************"

function is_sparse_checkout_active() {
    local sparse_checkout_file=".git/info/sparse-checkout"

    if git rev-parse --is-inside-work-tree &> /dev/null; then
        if [ -f "$sparse_checkout_file" ] && [ -s "$sparse_checkout_file" ]; then
            return 0  # Sparse Checkout ativo
        else
            return 1  # Sparse Checkout não ativo
        fi
    else
        return 1  # Não está dentro de uma árvore de trabalho Git
    fi
}


function log() {
    local now=$(date +"%T")
    local message

    # Itera sobre todos os argumentos
    for message in "$@"; do
        local formatted_message="[$now] $message"
        echo "$formatted_message"
    done
}


git_status=$(git status --porcelain)
if [ -n "$git_status" ]; then
    log "Há mudanças não comitadas no repositório."
fi



function list_modules() {
    echo $(git sparse-checkout list | sed 's|.*/||')
}

function clear_sparse_checkout() {

    if ! is_sparse_checkout_active; then
        echo "Sparse checkout não está ativo."
        exit 1
    fi
    # Configura o sparse checkout para um conjunto vazio de caminhos
    git sparse-checkout set --
    git sparse-checkout init --cone
    echo "Sparse checkout limpo."
}

function ensure_workspace_module() {
    local workspace_path="modules/workspace"
    if ! git sparse-checkout list | grep -q "$workspace_path"; then
        add_module workspace
    fi
}

function ensure_libs_modules(){
  local libs_path="libs"
  if ! git sparse-checkout list | grep -q "$libs_path"; then
      git sparse-checkout add $libs_path
  fi
}

function reset_module_federation(){
  local federation_config_file="modules/workspace/module-federation.config.ts"
  git restore "$federation_config_file"
  reset_router_federation
}

function ensure_modules_on_federation(){
  local federation_config_file="modules/workspace/module-federation.config.ts"

  # checa se o arquivo existe
  if [ ! -f "$federation_config_file" ]; then
      log "Arquivo $federation_config_file não encontrado."
      exit 1
  fi

  # Lista todos os módulos no sparse checkout
  local sparse_checkout_modules=$(git sparse-checkout list)

  # Módulos conhecidos que podem estar no arquivo de configuração
  local all_modules=("secas" "fatur" "analy" "conti" "logis" "produ" "rehum" "atend" "supri")

  for module in "${all_modules[@]}"; do
      if echo "$sparse_checkout_modules" | grep -q "$module"; then
          # Descomenta o módulo no arquivo se ele estiver no sparse checkout
          sed -i "s/\/\/\s*'$module',/'$module',/" "$federation_config_file"
      else
          # Comenta o módulo no arquivo se ele não estiver no sparse checkout
          sed -i "s/'$module',/\/\/ '$module',/" "$federation_config_file"
      fi
  done

  ensure_router_federation
}

function reset_router_federation(){
  local federation_config_file="modules/workspace/src/app/app.routes.ts"
  git restore "$federation_config_file"
}

function ensure_router_federation(){
  local routes_config_file="modules/workspace/src/app/app.routes.ts"

    # Verifica se o arquivo existe
    if [ ! -f "$routes_config_file" ]; then
        log "Arquivo $routes_config_file não encontrado."
        exit 1
    fi

    # Lista todos os módulos no sparse checkout
    local sparse_checkout_modules=$(git sparse-checkout list)

    # Mapeamento dos módulos para nomes esperados no arquivo de rotas
    declare -A module_map
    module_map["secas"]="Seguranca_e_Controle_de_Acesso"
    module_map["fatur"]="Faturamento"
    module_map["analy"]="Analytics_e_Relatorios"
    module_map["conti"]="Contabilidade"
    module_map["logis"]="Logistica"
    module_map["produ"]="Producao"
    module_map["rehum"]="Recursos_Humanos"
    module_map["atend"]="Atendimento"
    module_map["supri"]="Suprimentos"

    for module in "${!module_map[@]}"; do
        local route_name=${module_map[$module]}
        if echo "$sparse_checkout_modules" | grep -q "$module"; then
            # Descomenta apenas a linha loadChildren para a rota específica
            sed -i "/FlexSuiteModuleRoutes.${route_name}.Home/,+1 s/^\/\/ //" "$routes_config_file"
        else
            # Comenta apenas a linha loadChildren para a rota específica
            sed -i "/FlexSuiteModuleRoutes.${route_name}.Home/,+1 s/^[^\/]/\/\/ &/" "$routes_config_file"
        fi
    done
}

function add_module(){
  git sparse-checkout add modules/$module
  git sparse-checkout add modules/$module-e2e
}

function del_module(){
  local sparse_checkout_file=".git/info/sparse-checkout"

  # Cria uma nova lista sem o módulo especificado
  grep -v "/modules/$module" "$sparse_checkout_file" > temp_sparse_checkout
  mv temp_sparse_checkout "$sparse_checkout_file"

  # Atualiza a árvore de trabalho
  git read-tree -mu HEAD
}

function add_modules() {
    local current_modules=$(list_modules)
    log "Módulos disponíveis para adicionar: secas, fatur, analy, conti, logis, produ, rehum, atend, supri"
    log "Insira os módulos para adicionar, separados por vírgula:"
    read -r new_modules
    IFS=',' read -ra ADDR <<< "$new_modules"

    if [[ " ${ADDR[@]} " =~ " workspace" ]]; then
        log "Não é possível adicionar o módulo workspace."
        exit 1
    fi

    for module in "${ADDR[@]}"; do
        if [[ " ${current_modules[@]} " =~ " $module " ]]; then
            log "Módulo $module já está no sparse checkout."
        else
            add_module $module
            reset_module_federation
            ensure_modules_on_federation
        fi
    done
}

function remove_modules() {
    local current_modules=$(list_modules)
    log "Módulos atuais no sparse checkout: $current_modules"
    log "Insira os módulos para remover, separados por vírgula:"
    read -r remove_modules
    IFS=',' read -ra ADDR <<< "$remove_modules"

    if [[ " ${ADDR[@]} " =~ " workspace" ]]; then
        log "Não é possível remover o módulo workspace."
        exit 1
    fi


    for module in "${ADDR[@]}"; do
        if [[ " ${current_modules[@]} " =~ " $module " ]]; then
            del_module $module
            reset_module_federation
            ensure_modules_on_federation
        else
            log "Módulo $module não está no sparse checkout."
        fi
    done
}

function disable_sparse_checkout() {
    reset_module_federation
    clear_sparse_checkout
    git sparse-checkout disable
    echo "Sparse checkout desativado."
}

function enable_sparse_checkout() {

    git sparse-checkout init --cone
    git sparse-checkout set modules/workspace modules/workspace-e2e libs

    ensure_libs_modules
    ensure_modules_on_federation

    log "Sparse checkout ativado."

    list_modules_on_sparse_checkout
}

function help_menu() {
    echo "Uso: $0 [opção] [argumentos]"
    echo "Opções:"
    echo "  -e, --enable         Ativa o sparse checkout, habilitando a exclusão seletiva de diretórios."
    echo "  -d, --disable        Desativa o sparse checkout, restaurando o repositório para o estado completo."
    echo "  -a, --add [modulos]  Adiciona módulos especificados ao sparse checkout."
    echo "                       Exemplo: $0 -a 'modulo1,modulo2'"
    echo "                       Adiciona 'modulo1' e 'modulo2' ao sparse checkout."
    echo "  -r, --del [modulos]  Remove módulos especificados do sparse checkout."
    echo "                       Exemplo: $0 -r 'modulo1,modulo2'"
    echo "                       Remove 'modulo1' e 'modulo2' do sparse checkout."
    echo "  -c, --clear          Limpa o sparse checkout, removendo todos os módulos configurados."
    echo "                       Restaura o repositório para incluir todos os arquivos e diretórios."
    echo "  -h, --help           Mostra este menu de ajuda e sai."
    echo ""
    echo "Notas:"
    echo "  - Os módulos devem ser especificados como uma lista delimitada por vírgulas sem espaços."
    echo "  - O comando --add ou --del só deve ser usado após ativar o sparse checkout com --enable."
    echo "  - O sparse checkout é uma funcionalidade do Git que permite clonar parcialmente um repositório."
    echo "    Para mais informações, consulte https://git-scm.com/docs/git-sparse-checkout."
    echo ""
    echo "Exemplos:"
    echo "  $0 -e"
    echo "    Ativa o sparse checkout."
    echo "  $0 -a 'secas,fatur'"
    echo "    Adiciona os módulos 'secas' e 'fatur' ao sparse checkout."
    echo "  $0 -r 'secas,fatur'"
    echo "    Remove os módulos 'secas' e 'fatur' do sparse checkout."
    echo "  $0 -c"
    echo "    Limpa o sparse checkout, removendo todos os módulos configurados."
    echo "  $0 -d"
    echo "    Desativa o sparse checkout, restaurando o repositório para o estado completo."
    echo ""
    echo "Reporte bugs para: @LucaoMendes"
    echo "Gerenciador de Sparse Checkout para o flexSuite"
    echo "Modulos disponiveis: secas, fatur, analy, conti, logis, produ, rehum, atend, supri"

}

function add_modules_from_args() {
    log "Adicionando módulos: $1"
    local modules_to_add=($1)

    if [[ " ${modules_to_add[@]} " =~ " workspace" ]]; then
        log "Não é possível adicionar o módulo workspace."
        exit 1
    fi

    #se vazio
    if [ -z "$modules_to_add" ]; then
        log "Nenhum módulo informado."
        exit 1
    fi
    local current_modules=$(list_modules)

    for module in "${modules_to_add[@]}"; do
      if [[ " ${current_modules[@]} " =~ " $module " ]]; then
          log "Módulo $module já está no sparse checkout."
      else
          reset_module_federation
          add_module $module
          ensure_modules_on_federation
      fi
    done

  list_modules_on_sparse_checkout
}

function remove_modules_from_args() {
    log "Removendo módulos: $1"
    local modules_to_remove=($1)

    if [[ " ${modules_to_remove[@]} " =~ " workspace" ]]; then
        log "Não é possível remover o módulo workspace."
        exit 1
    fi

    #se vazio
    if [ -z "$modules_to_remove" ]; then
        log "Nenhum módulo informado."
        exit 1
    fi
    local current_modules=$(list_modules)

    for module in "${modules_to_remove[@]}"; do
        if [[ " ${current_modules[@]} " =~ " $module " ]]; then
            reset_module_federation
            del_module $module
            ensure_modules_on_federation
        else
            log "Módulo $module não está no sparse checkout."
        fi
    done
  list_modules_on_sparse_checkout

}

function list_modules_on_sparse_checkout(){
  local modules_on_sparse_checkout=$(git sparse-checkout list | sed 's|.*/||')

  log "Modulos ativos:"
  log $modules_on_sparse_checkout
}

if [[ "$#" -gt 0 ]]; then
  # Processamento de argumentos
  while [[ "$#" -gt 0 ]]; do
      case $1 in
          -e|--enable)
            if is_sparse_checkout_active; then
                log "Sparse checkout já está ativo."
                exit 1
            fi
            enable_sparse_checkout
            shift ;;
          -d|--disable)
            if ! is_sparse_checkout_active; then
                log "Sparse checkout não está ativo."
                exit 1
            fi
            disable_sparse_checkout;
            exit 1 ;;
          -c|--clear) clear_sparse_checkout; shift 2 ;;
          -a|--add)
              if ! is_sparse_checkout_active; then
                log "Sparse checkout não está ativo. Ativando"
                enable_sparse_checkout
              fi

              modules_to_add=${2//,/ }

              add_modules_from_args "$modules_to_add"
              shift 2
              ;;
          -r|--del)
              if ! is_sparse_checkout_active; then
                  log "Sparse checkout não está ativo. Ative-o com a opção -e ou --enable."
                  exit 1
              fi

              modules_to_remove=${2//,/ }
              remove_modules_from_args "$modules_to_remove"
              shift 2
              ;;
          -h|--help) help_menu; exit 0 ;;

          *) echo "Opção desconhecida: $1"; help_menu; exit 1 ;;
      esac
      shift
  done
else
  if is_sparse_checkout_active; then
      echo "Sparse checkout ativo. Módulos atuais: $(list_modules)"
      echo "Opções:"
      echo "1) Adicionar módulos"
      echo "2) Remover módulos"
      echo "3) Desativar sparse checkout"
      echo "0) Sair"
      read -r -p "Escolha uma opção: " opcao

      case $opcao in
          0) exit 0 ;;
          1) add_modules ;;
          2) remove_modules ;;
          3) disable_sparse_checkout ;;
          *) echo "Opção inválida." ;;
      esac
  else
      echo "Sparse checkout não está ativo. Deseja ativá-lo? (s/n):"
      read -r resposta
      if [[ $resposta =~ ^[Ss]$ ]]; then
          enable_sparse_checkout
          add_modules
      else
          echo "Sparse checkout permanece desativado."
      fi
  fi
fi
