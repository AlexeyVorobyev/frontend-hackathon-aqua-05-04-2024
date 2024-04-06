import {IAlexFilter} from '../shared-react-components/AlexFilters/AlexFilter.tsx'
import {
    AlexAutocompleteControlled
} from '../shared-react-components/form-utils/alex-autocomplete/alex-autocomplete-controlled.component.tsx'
import {EPlaceCategory, EPlaceCondition} from '../core/apollo/types/graphql/graphql.ts'
import {EPlaceCategoryToRusName, EPlaceConditionToRusName} from '../components/enum/place-category-to-rus-name.enum.ts'


export const alexFiltersConfigData:Map<string,IAlexFilter> = new Map([
    ['placeType',{
        component: (
            <AlexAutocompleteControlled name={'placeType'} multiple
                                        label={'Тип'}
                                        options={Object.values(EPlaceCategory).map((item) => ({
                                            id:item,
                                            title: EPlaceCategoryToRusName[item]
                                        }))}
            />
        )
    }],
    ['placeCondition',{
        component: (
            <AlexAutocompleteControlled name={'placeCondition'} multiple
                                        label={'Условия'}
                                        options={Object.values(EPlaceCondition).map((item) => ({
                                            id:item,
                                            title: EPlaceConditionToRusName[item]
                                        }))}
            />
        )
    }]
])