import { useSelector, useDispatch } from 'react-redux'
import { Filters } from 'features/filters/filtersSlice'

export const visibleItems = ({
    org,
    repo,
    page = 1,
    setJumpToPage,
    showIssueComments
}) => {
    const dispatch = useDispatch()

    const {
        currentPageIssues,
        isLoading,
        error,
        issuesByNumber,
        pageCount
    } = useSelector((state) => state.items)
    // get base set from items slice
    // get active filters from filter slice
    // apply filters and display items

}