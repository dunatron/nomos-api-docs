import { gql  } from 'react-apollo'

export const FETCH_LANGUAGES = gql`
query readLanguages {
  readLanguages {
    Name
  }
}
`