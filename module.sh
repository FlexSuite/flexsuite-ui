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

git_status=$(git status --porcelain)
if [ -n "$git_status" ]; then
    echo "Há mudanças não comitadas no repositório. Por favor, faça commit ou reverta essas mudanças antes de prosseguir."
    exit 1
fi

function list_modules() {
    echo $(git sparse-checkout list | sed 's/\/modules\///g')
}

function add_modules() {
    local current_modules=$(list_modules)
    echo "Módulos disponíveis para adicionar: secas, fatur, analy, conti, logis, produ, rehum, atend, supri"
    echo "Insira os módulos para adicionar, separados por vírgula:"
    read -r new_modules
    IFS=',' read -ra ADDR <<< "$new_modules"
    for module in "${ADDR[@]}"; do
        if [[ ! " ${current_modules[@]} " =~ " ${module} " ]]; then
            git sparse-checkout add /modules/$module
            echo "Adicionado: $module"
        else
            echo "Já presente: $module"
        fi
    done
}

function remove_modules() {
    local current_modules=$(list_modules)
    echo "Módulos atuais no sparse checkout: $current_modules"
    echo "Insira os módulos para remover, separados por vírgula:"
    read -r remove_modules
    IFS=',' read -ra ADDR <<< "$remove_modules"
    for module in "${ADDR[@]}"; do
        if [[ " ${current_modules[@]} " =~ " ${module} " ]]; then
            git sparse-checkout remove /modules/$module
            echo "Removido: $module"
        else
            echo "Não encontrado: $module"
        fi
    done
}

function disable_sparse_checkout() {
    git sparse-checkout disable
    echo "Sparse checkout desativado."
}

function enable_sparse_checkout() {
    git sparse-checkout init --cone
    echo "Sparse checkout ativado."
}

function help_menu() {
    echo "Uso: $0 [opção]"
    echo "Opções:"
    echo "  -e, --enable     Ativa o sparse checkout."
    echo "  -d, --disable    Desativa o sparse checkout."
    echo "  -a, --add        Adiciona módulos ao sparse checkout."
    echo "  -r, --del        Remove módulos do sparse checkout."
    echo "  -h, --help       Mostra este menu de ajuda."
}

# Processamento de argumentos
while [[ "$#" -gt 0 ]]; do
    case $1 in
        -e|--enable) enable_sparse_checkout; exit 0 ;;
        -d|--disable) disable_sparse_checkout; exit 0 ;;
        -a|--add) modules_to_add=${2//,/ }; shift ;;
        -r|--del) modules_to_remove=${2//,/ }; shift ;;
        -h|--help) help_menu; exit 0 ;;
        *) echo "Opção desconhecida: $1"; help_menu; exit 1 ;;
    esac
    shift
done

# Funcionalidade sem parâmetros
if is_sparse_checkout_active; then
    echo "Sparse checkout ativo. Módulos atuais: $(list_modules)"
    echo "1) Adicionar módulos"
    echo "2) Remover módulos"
    echo "3) Desativar sparse checkout"
    read -r -p "Escolha uma opção: " opcao

    case $opcao in
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
