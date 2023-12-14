import { FlexSuiteCommonPages, FlexSuiteFaturPages, FlexSuiteModules, FlexSuiteSecasPages } from "../enums/FlexSuiteNavigation"
import { IAppItem } from "../interfaces/IAppItem"
import { ISidebarItem } from "../interfaces/ISidebarItem"
import { FlexSuiteIcons } from "../icons/FlexSuiteIcons"
import { FlexSuiteModuleRoutes } from "./FlexSuiteModuleRoutes"
import { matLock } from "@ng-icons/material-icons/baseline"

export const AppMenu: IAppItem[] = [

    {
        id: 1,
        label: FlexSuiteModules.SECAS,
        path: FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.SECAS)
    },
    {
        id:2,
        label: FlexSuiteModules.FATUR,
        path: FlexSuiteModuleRoutes.Faturamento.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.FATUR)
    },
    {
        id: 3,
        label: FlexSuiteModules.ANALY,
        path: FlexSuiteModuleRoutes.Analytics_e_Relatorios.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.ANALY)
    },
    {
        id: 4,
        label: FlexSuiteModules.CONTI,
        path: FlexSuiteModuleRoutes.Contabilidade.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.CONTI)
    },
    {
        id: 5,
        label: FlexSuiteModules.LOGIS,
        path: FlexSuiteModuleRoutes.Logistica.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.LOGIS)
    },
    {
        id: 6,
        label: FlexSuiteModules.PRODU,
        path: FlexSuiteModuleRoutes.Producao.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.PRODU)
    },
    {
        id: 7,
        label: FlexSuiteModules.REHUM,
        path: FlexSuiteModuleRoutes.Recursos_Humanos.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.REHUM)
    },
    {
        id: 8,
        label: FlexSuiteModules.ATEND,
        path: FlexSuiteModuleRoutes.Atendimento.Home,
        icon: FlexSuiteIcons.getModuleIcon(FlexSuiteModules.ATEND)
    },
    {
        id: 9,
        label: FlexSuiteModules.SUPRI,
        path: FlexSuiteModuleRoutes.Suprimentos.Home,
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
                    path: FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso.Usuarios,
                    icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SECAS,FlexSuiteSecasPages.USUARIOS)
                },
                {
                    id: 3,
                    label: "Prestadores",
                    path: FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso.Prestadores,
                    icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SECAS,FlexSuiteSecasPages.PRESTADORES)
                },
            ]
        },
        {
            id: 4,
            label: "Configuracoes",
            path: FlexSuiteModuleRoutes.Seguranca_e_Controle_de_Acesso.Configuracoes,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.SECAS,FlexSuiteSecasPages.CONFIGURACOES)
        },
    ],
    [FlexSuiteModules.FATUR]: [
        {
            id: 1,
            label: "Cobrancas",
            path: FlexSuiteModuleRoutes.Faturamento.Cobrancas,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.FATUR,FlexSuiteFaturPages.COBRANCAS)
        },
        {
            id: 2,
            label: "Faturas",
            path: FlexSuiteModuleRoutes.Faturamento.Faturas,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.FATUR,FlexSuiteFaturPages.FATURAS)
        },
        {
            id: 3,
            label: "Configuracoes",
            path: FlexSuiteModuleRoutes.Faturamento.Configuracoes,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.FATUR,FlexSuiteFaturPages.CONFIGURACOES)
        },
    ],
    [FlexSuiteModules.ANALY]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Analytics_e_Relatorios.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.ANALY,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.CONTI]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Contabilidade.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.CONTI,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.LOGIS]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Logistica.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.LOGIS,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.PRODU]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Producao.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.PRODU,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.REHUM]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Recursos_Humanos.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.REHUM,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.ATEND]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Atendimento.Home,
            icon: FlexSuiteIcons.getPageIcon(FlexSuiteModules.ATEND,FlexSuiteCommonPages.HOME)
        },
    ],
    [FlexSuiteModules.SUPRI]: [
        {
            id: 1,
            label: "Home",
            path: FlexSuiteModuleRoutes.Suprimentos.Home,
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
