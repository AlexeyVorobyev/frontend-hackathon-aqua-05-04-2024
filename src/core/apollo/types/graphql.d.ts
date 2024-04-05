declare module '*.graphql' {
    import { DocumentNode } from 'src/core/apollo/types/graphql'
    const Schema: DocumentNode

    export = Schema
}