export type TGender = '0' | '1' | '2'

export type TPersonPopularitySort = 'asc' | 'desc'
export type TPersonKnownDepartment = 'Acting' | 'Directing' | 'All'

export interface IPersonQuary {
    popularitySort: TPersonPopularitySort,
    filterByGender: TGender,
    knownDepartmentFilter: TPersonKnownDepartment
}
