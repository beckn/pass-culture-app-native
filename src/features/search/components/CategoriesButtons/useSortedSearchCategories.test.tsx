import { renderHook } from '@testing-library/react-hooks'

import { categoriesIcons } from 'ui/svg/icons/bicolor/exports/categoriesIcons'

import { useSortedSearchCategories } from './useSortedSearchCategories'

describe('useSortedSearchCategories', () => {
  it('should return all categories', () => {
    const { result } = renderHook(useSortedSearchCategories)

    expect(result.current.length).toEqual(13)
  })

  it("should format category's label", () => {
    const { result } = renderHook(useSortedSearchCategories)

    expect(result.current[11].label).toEqual('Spectacles')
  })

  it('should set icon for category', () => {
    const { result } = renderHook(useSortedSearchCategories)

    expect(result.current[11].Icon).toEqual(categoriesIcons.Show)
  })

  it('should sort search group names alphabetically', () => {
    const { result } = renderHook(useSortedSearchCategories)

    const actualCategoriesLabels = result.current.map((category) => category.label)
    expect(actualCategoriesLabels).toEqual([
      'Beaux-Arts',
      'Carte jeunes',
      'Cinéma',
      'Conférences, rencontres',
      'Cours, ateliers',
      'Films, séries',
      'Instruments de musique',
      'Jeux',
      'Livre',
      'Musique',
      'Presse, médias',
      'Spectacles',
      'Visites, expositions',
    ])
  })
})
