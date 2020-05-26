import React from 'react'
import {useOvermind} from '../../overmind'

function Multiselect() {
    const {state, actions} = useOvermind()

    return (
        <div>
            <label htmlFor="countries">Countries</label>
            <br />
            <select
                id="countries"
                name="countries"
                value={state.currentCountrySlugs}
                //defaultValue={state.currentCountrySlug}
                onChange={e => {
                    const country_slugs = Array.from(
                        e.target.selectedOptions,
                    ).map(function (el) {
                        return el.value
                    })

                    actions.setCurrentCountrySlug(country_slugs)
                }}
                multiple={true}
            >
                {state.countries.map(function (country, i) {
                    return (
                        <option value={country.Slug} key={i}>
                            {country.Country}
                        </option>
                    )
                })}
            </select>
            <div>
                Selected Countries:
                {state.currentCountrySlugs &&
                    state.currentCountrySlugs.map(function (country, idx) {
                        return (
                            <span>
                                {idx > 0 ? ', ' : null}
                                {country}
                            </span>
                        )
                    })}
            </div>
        </div>
    )
}

export default Multiselect
