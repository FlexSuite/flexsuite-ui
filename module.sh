#!/bin/bash

echo "**********************************************************"
echo "*                                                        *"
echo "*     Gerenciador de Sparse Checkout                     *"
echo "*                                                        *"
echo "**********************************************************"

function is_sparse_checkout_active() {
    git rev-parse --is-inside-work-tree &> /dev/null && git sparse-checkout list &> /dev/null
    return $?
}

# git_status=$(git status --porcelain)
# if [ -n "$git_status" ]; then
#     echo "Há mudanças não comitadas no repositório. Por favor, faça commit ou reverta essas mudanças antes de prosseguir."
#     exit 1
# fi

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

function add_module(){
  git sparse-checkout add modules/$module
  git sparse-checkout add modules/$module-e2e
}

function del_module(){
  git sparse-checkout list | grep -v "/modules/$module" > .git/info/sparse-checkout
  git read-tree -mu HEAD
}

function add_modules() {
    local current_modules=$(list_modules)
    echo "Módulos disponíveis para adicionar: secas, fatur, analy, conti, logis, produ, rehum, atend, supri"
    echo "Insira os módulos para adicionar, separados por vírgula:"
    read -r new_modules
    IFS=',' read -ra ADDR <<< "$new_modules"

    if [[ " ${ADDR[@]} " =~ " workspace" ]]; then
        echo "Não é possível adicionar o módulo workspace."
        exit 1
    fi

    local added_modules=()

    for module in "${ADDR[@]}"; do
        if [[ " ${current_modules[@]} " =~ " $module " ]]; then
            echo "Módulo $module já está no sparse checkout."
        else
            ensure_workspace_module
            add_module $module
            added_modules+=(' '$module)
        fi
    done

    if [ ${#added_modules[@]} -gt 0 ]; then
        echo "Módulos adicionados: ${added_modules[@]}"
    fi
}

function remove_modules() {
    local current_modules=$(list_modules)
    echo "Módulos atuais no sparse checkout: $current_modules"
    echo "Insira os módulos para remover, separados por vírgula:"
    read -r remove_modules
    IFS=',' read -ra ADDR <<< "$remove_modules"

    if [[ " ${ADDR[@]} " =~ " workspace" ]]; then
        echo "Não é possível remover o módulo workspace."
        exit 1
    fi

    local deleted_modules=()

    for module in "${ADDR[@]}"; do
        if [[ " ${current_modules[@]} " =~ " $module " ]]; then
            del_module $module
            deleted_modules+=(' '$module)
        else
            echo "Módulo $module não está no sparse checkout."
        fi
    done

    if [ ${#deleted_modules[@]} -gt 0 ]; then
        echo "Módulos removidos: ${deleted_modules[@]}"
    fi
}

function disable_sparse_checkout() {
    clear_sparse_checkout
    git sparse-checkout disable
    echo "Sparse checkout desativado."
}

function enable_sparse_checkout() {
    git sparse-checkout init --cone
    echo "Sparse checkout ativado."
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
    local modules_to_add=($1)

    if [[ " ${modules_to_add[@]} " =~ " workspace" ]]; then
        echo "Não é possível adicionar o módulo workspace."
        exit 1
    fi

    #se vazio
    if [ -z "$modules_to_add" ]; then
        echo "Nenhum módulo informado."
        exit 1
    fi
    local current_modules=$(list_modules)
    local added_modules=()

    for module in "${modules_to_add[@]}"; do
      if [[ " ${current_modules[@]} " =~ " $module " ]]; then
          echo "Módulo $module já está no sparse checkout."
      else
          ensure_workspace_module
          add_module $module
          added_modules+=(' '$module)
      fi
    done

    if [ ${#added_modules[@]} -gt 0 ]; then
        echo "Módulos adicionados: ${added_modules[@]}"
    fi
}

function remove_modules_from_args() {
    local modules_to_remove=($1)

    if [[ " ${modules_to_remove[@]} " =~ " workspace" ]]; then
        echo "Não é possível remover o módulo workspace."
        exit 1
    fi

    #se vazio
    if [ -z "$modules_to_remove" ]; then
        echo "Nenhum módulo informado."
        exit 1
    fi
    local current_modules=$(list_modules)
    local removed_modules=()

    for module in "${modules_to_remove[@]}"; do
        if [[ " ${current_modules[@]} " =~ " $module " ]]; then
            del_module $module
            removed_modules+=(' '$module)
        else
            echo "Módulo $module não está no sparse checkout."
        fi
    done

    if [ ${#removed_modules[@]} -gt 0 ]; then
        echo "Módulos removidos: ${removed_modules[@]}"
    fi

}

if [[ "$#" -gt 0 ]]; then
  # Processamento de argumentos
  while [[ "$#" -gt 0 ]]; do
      case $1 in
          -e|--enable)
            if is_sparse_checkout_active; then
                echo "Sparse checkout já está ativo."
                exit 1
            fi
            enable_sparse_checkout
            shift ;;
          -d|--disable)
            if ! is_sparse_checkout_active; then
                echo "Sparse checkout não está ativo."
                exit 1
            fi
            disable_sparse_checkout;
            exit 1 ;;
          -c|--clear) clear_sparse_checkout; shift 2 ;;
          -a|--add)
              if ! is_sparse_checkout_active; then
                  echo "Sparse checkout não está ativo. Ative-o com a opção -e ou --enable."
                  exit 1
              fi
              modules_to_add=${2//,/ }
              add_modules_from_args "$modules_to_add"
              shift 2
              ;;
          -r|--del)
              if ! is_sparse_checkout_active; then
                  echo "Sparse checkout não está ativo. Ative-o com a opção -e ou --enable."
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
