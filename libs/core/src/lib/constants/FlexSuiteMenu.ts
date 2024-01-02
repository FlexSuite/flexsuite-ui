import { FlexSuiteCommonPages, FlexSuiteFaturPages, FlexSuiteModules, FlexSuiteSecasPages } from "../enums/FlexSuiteNavigation"
import { IAppItem } from "../interfaces/IAppItem"
import { ISidebarItem } from "../interfaces/ISidebarItem"
import { FlexSuiteIcons } from "../icons/FlexSuiteIcons"
import { FlexSuiteModuleRoutes } from "./FlexSuiteModuleRoutes"
import { matLock } from "@ng-icons/material-icons/baseline"

const secasRoutes = FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso
const faturRoutes = FlexSuiteModuleRoutes.Faturamento
const analyRoutes = FlexSuiteModuleRoutes.Analytics_e_Relatorios
const contiRoutes = FlexSuiteModuleRoutes.Contabilidade
const logisRoutes = FlexSuiteModuleRoutes.Logistica
const produRoutes = FlexSuiteModuleRoutes.Producao
const rehumRoutes = FlexSuiteModuleRoutes.Recursos_Humanos
const atendRoutes = FlexSuiteModuleRoutes.Atendimento
const supriRoutes = FlexSuiteModuleRoutes.Suprimentos

export const AppMenu: IAppItem[] = [

    {
        id: 1,
        label: FlexSuiteModules.SECAS,
        path: secasRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.SECAS)
    },
    {
        id:2,
        label: FlexSuiteModules.FATUR,
        path: faturRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.FATUR)
    },
    {
        id: 3,
        label: FlexSuiteModules.ANALY,
        path: analyRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.ANALY)
    },
    {
        id: 4,
        label: FlexSuiteModules.CONTI,
        path: contiRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.CONTI)
    },
    {
        id: 5,
        label: FlexSuiteModules.LOGIS,
        path: logisRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.LOGIS)
    },
    {
        id: 6,
        label: FlexSuiteModules.PRODU,
        path: produRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.PRODU)
    },
    {
        id: 7,
        label: FlexSuiteModules.REHUM,
        path: rehumRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.REHUM)
    },
    {
        id: 8,
        label: FlexSuiteModules.ATEND,
        path: atendRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.ATEND)
    },
    {
        id: 9,
        label: FlexSuiteModules.SUPRI,
        path: supriRoutes.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.SUPRI)
    }
]

export const FlexSuiteSidebarItems:{
    [key in FlexSuiteModules]: ISidebarItem[]
} = {
    [FlexSuiteModules.SECAS]: [
        {
            id: 1,
            label: "Controle de Acesso",
            icon: matLock,
            children: [
                {
                    id: 2,
                    label: "Usuarios",
                    path: secasRoutes.Home + '/' + secasRoutes.Usuarios,
                    icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SECAS,FlexSuiteSecasPages.USUARIOS)
                },
                {
                    id: 3,
                    label: "Prestadores",
                    path: secasRoutes.Home + '/' + secasRoutes.Prestadores,
                    icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SECAS,FlexSuiteSecasPages.PRESTADORES)
                },
            ]
        },
        {
            id: 4,
            label: "Configuracoes",
            path: secasRoutes.Home + '/' + secasRoutes.Configuracoes,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SECAS,FlexSuiteSecasPages.CONFIGURACOES)
        },
    ],
    [FlexSuiteModules.FATUR]: [
        {
            id: 1,
            label: "Cobrancas",
            path: faturRoutes.Cobrancas,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.FATUR,FlexSuiteFaturPages.COBRANCAS)
        },
        {
            id: 2,
            label: "Faturas",
            path: faturRoutes.Faturas,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.FATUR,FlexSuiteFaturPages.FATURAS)
        },
        {
            id: 3,
            label: "Configuracoes",
            path: faturRoutes.Configuracoes,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.FATUR,FlexSuiteFaturPages.CONFIGURACOES)
        },
    ],
    [FlexSuiteModules.ANALY]: [
        {
            id: 1,
            label: "Home",
            path: analyRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.ANALY,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.CONTI]: [
        {
            id: 1,
            label: "Home",
            path: contiRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.CONTI,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.LOGIS]: [
        {
            id: 1,
            label: "Home",
            path: logisRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.LOGIS,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.PRODU]: [
        {
            id: 1,
            label: "Home",
            path: produRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.PRODU,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.REHUM]: [
        {
            id: 1,
            label: "Home",
            path: rehumRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.REHUM,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.ATEND]: [
        {
            id: 1,
            label: "Home",
            path: atendRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.ATEND,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.SUPRI]: [
        {
            id: 1,
            label: "Home",
            path: supriRoutes.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SUPRI,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.WORKS]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Workspace.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.WORKS,FlexSuiteCommonPages.HOME)
        },
    ],
}
