import {GLOBAL_CONFIG} from '../../../globalConfig.ts'

export interface IMapBackground {
    name: string
    url: string
    attribution?: string
}

export const mapBackground: IMapBackground[] = [
    ...GLOBAL_CONFIG.mapLayersConfig,
]
