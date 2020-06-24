import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import Select, { createFilter } from 'react-select'
import styled from 'styled-components'

import { addMultiNewCountries } from 'redux/action-creators/user/add-multi-new-countries'

import { KIERAN_GREY, customReactSelectStyles } from 'styles'

import { firebaseApp } from '../../config.js'

const Option = styled.div`
    display: flex;
    padding: 0;
    &:hover {
        color: black;
    }

    & img {
        margin-right: 10px;
        height: 20px;
        width: 30px;
    }

    & > div {
        color: ${KIERAN_GREY};
    }
`

const Container = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;

    @media (max-width: 700px) {
        padding-top: 100px;
    }
`

const Inner = styled.div`
    width: 80%;
`

const Country = styled.div`
    align-items: center;
    background: #fff;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    display: flex;
    padding: 7px;
    position: relative;
    margin: 5px;

    & > div {
        margin-left: 5px;
    }
`

const RemoveImg = styled.img`
    position: absolute;
    right: -7px;
    top: -5px;
`

const CountriesContainer = styled.div`
    display: flex;
    flex-direction: row;
    flex-wrap: wrap;
    margin-top: 20px;
    width: 100%;
`

const Save = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 10px;
    bottom: 0;
    color: #fff;
    cursor: pointer;
    margin: 20px;
    padding: 10px;
    position: absolute;
    right: 0;
`

const Mode = styled.div`
    margin-bottom: 20px;
`

const formatOptionLabel = ({ value, label, flag }) => (
    <Option>
        <img src={flag} alt="" />
        <div>{label}</div>
    </Option>
)

export const QuickAddCountry = ({ addMultiNewCountries, countries, setShowAddCountryForm, user }) => {
    const [selectedCountries, setSelectedCountries] = useState([])
    const [optionCountries, setOptionCountries] = useState([])

    useEffect(() => {
        let dropdownOptions = countries.selectOptions
        let visitedCountries = user.userVisitedCountries

        for (let i = dropdownOptions.length - 1; i >= 0; i--) {
            for (let j = 0; j < visitedCountries.length; j++) {
                if (dropdownOptions[i] && dropdownOptions[i].value === visitedCountries[j].name) {
                    dropdownOptions.splice(i, 1)
                }
            }
        }

        setOptionCountries(dropdownOptions)
    }, [])

    const saveCountries = () => {
        if (window.confirm(`You are about to add ${selectedCountries.length} countries to your list. Confirm?`)) {
            let updates = {}

            selectedCountries.map((country) => {
                const countryDetails = {
                    ...country,
                    name: country.value,
                }
                updates[`/users/${user.details.uid}/countries/${country.value}/`] = countryDetails
            })

            firebaseApp
                .database()
                .ref()
                .update(updates)
                .then(() => {
                    addMultiNewCountries(Object.values(updates))
                    alert('Countries successfully added')
                    setShowAddCountryForm(false)
                })
                .catch((err) => {
                    alert('data did not save:', err)
                })
        }
    }

    const handleSelect = (country) => {
        setSelectedCountries([...selectedCountries, country])
        setOptionCountries(optionCountries.filter((ctry) => ctry.value !== country.value))
    }

    const handleDelete = (country) => {
        setSelectedCountries(selectedCountries.filter((ctry) => ctry.label !== country.label))
        setOptionCountries(optionCountries.concat(country))
    }

    return (
        <Container>
            <Inner>
                <h3>Quick Add mode</h3>
                <Mode>
                    In quick add mode you can quickly add up to 15 countries at once. You can always add more detailed
                    stuff like specific visits and photos later!
                </Mode>
                <Select
                    filterOption={createFilter({ ignoreAccents: false })}
                    formatOptionLabel={formatOptionLabel}
                    maxMenuHeight={190}
                    onChange={(country) => handleSelect(country)}
                    options={optionCountries}
                    placeholder="Select a country to add to the list"
                    styles={customReactSelectStyles}
                    value={null}
                />

                <CountriesContainer>
                    {selectedCountries.map((country) => (
                        <Country>
                            <RemoveImg
                                onClick={() => handleDelete(country)}
                                src="/images/remove.svg"
                                width="15"
                                height="15"
                            />
                            <img src={country.flag} width="20" height="20" />
                            <div>{country.value}</div>
                        </Country>
                    ))}
                    {selectedCountries.length === 0 ? null : <Save onClick={saveCountries}>Save Countries</Save>}
                </CountriesContainer>
            </Inner>
        </Container>
    )
}

const mapState = ({ countries, user }) => ({
    countries,
    user,
})

const mapDispatch = {
    addMultiNewCountries,
}

export const QuickAddCountryContainer = connect(mapState, mapDispatch)(QuickAddCountry)
