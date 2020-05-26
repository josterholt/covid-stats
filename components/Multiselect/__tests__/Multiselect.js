import React from 'react'
import {
    render,
    fireEvent,
    act,
    getByText,
    waitFor,
} from '@testing-library/react'
import {createOvermind} from 'overmind'
import {Provider} from 'overmind-react'
import '@testing-library/jest-dom'

import Multiselect from '../../Multiselect'

test('Dashboard has country multiselect', async () => {
    const config = {
        state: {
            countries: [
                {
                    Country: 'United States',
                    Slug: 'united-states',
                    ISO2: 'US',
                },
                {
                    Country: 'Canada',
                    Slug: 'canada',
                    ISO2: 'CA',
                },
            ],
        },
    }

    const overmind = createOvermind(config)
    const wrapper = ({children}) => {
        return <Provider value={overmind}>{children}</Provider>
    }
    const {debug, getByLabelText, getByText} = render(<Multiselect />, {
        wrapper,
    })

    expect(getByLabelText(/countries/i)).toBeInTheDocument()
    expect(getByText(/united states/i)).toBeInTheDocument()
    getByText(/united states/i).click()
    expect(getByText(/canada/i)).toBeInTheDocument()
    getByText(/canada/i).click()

    debug()
})
