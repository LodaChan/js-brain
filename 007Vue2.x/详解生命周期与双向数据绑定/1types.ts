
export type Component =

    typeof Vue |
    FunctionalComponentOptions<Props> |
    ComponentOptions<never, Data, Methods, Computed, Props>;



export class Vue {

}

export class Props {

}

export class Data {

}

export class Methods {

}

export class Computed {

}

export interface FunctionalComponentOptions<Props> {
    name?: string
}

export interface ComponentOptions<never, Data, Methods, Computed, Props> {

}

