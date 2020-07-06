import React from 'react'
import styled from 'styled-components'

import { KIERAN_GREY } from 'styles'

const Add = styled.div`
    background: ${KIERAN_GREY};
    border-radius: 3px;
    color: #fff;
    display: inline-block;
    font-size: 12px;
    padding: 5px;
`

const AddByButtons = styled.div`
    display: flex;
    flex-direction: row;
`

const AddByButton = styled.div`
    background: ${({ selected }) => (selected ? KIERAN_GREY : '#fff')};
    border: 1px solid ${KIERAN_GREY};
    border-radius: 3px;
    color: ${({ selected }) => (selected ? '#fff' : KIERAN_GREY)};
    font-size: 13px;
    padding: 5px;
    margin: 5px;
    text-align: center;
    width: 140px;
`

const AddTravellersHeading = styled.div`
    font-size: 20px;
    font-weight: bold;
    text-transform: uppercase;
`

const Search = styled.input`
    border: 1px solid #ccc;
    font-size: 13px;
    margin: 10px;
    padding: 5px;
    width: 200px;

    ::placeholder {
        color: #9393a8;
        font-size: 13px;
    }
`

const InstagramPlaceholder = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    margin: 10px;

    & > img {
        border-radius: 75px;
        height: 75px;
        width: 75px;
    }
`

const SearchContainer = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: space-between;
`

export const TravellersSearch = ({
    addBy,
    addTraveller,
    newPerson,
    newTraveller,
    setAddBy,
    setNewTraveller,
    setNewPerson,
    setTraveller,
    travellers,
}) => {
    const addPersonViaInstagramOrManually = () => {
        if (addBy === 'instagram') {
            fetch(`https://www.instagram.com/${newPerson}/?__a=1`)
                .then((res) => res.json())
                .then((res) => {
                    if (Object.keys(res).length) {
                        setNewTraveller({
                            username: res.graphql.user.username,
                            photo: res.graphql.user.profile_pic_url_hd,
                            name: res.graphql.user.full_name,
                        })
                    } else {
                        alert(
                            `User does exist OR you aren't authorized correctly with Instagram on this device. Please try another user or add manually`,
                        )
                    }
                })
        } else {
            setTraveller([
                ...travellers,
                {
                    username: newPerson,
                    photo: null,
                    name: newPerson,
                },
            ])
            setNewTraveller(null)
        }
    }

    return (
        <SearchContainer>
            <AddTravellersHeading>Add travellers</AddTravellersHeading>
            <AddByButtons>
                <AddByButton onClick={() => setAddBy('manual')} selected={addBy === 'manual'}>
                    Manually add person
                </AddByButton>
                <AddByButton onClick={() => setAddBy('instagram')} selected={addBy === 'instagram'}>
                    Add via instagram
                </AddByButton>
            </AddByButtons>
            <Search
                onChange={(e) => setNewPerson(e.target.value)}
                autoComplete="off"
                autoCorrect="off"
                autoCapitalize="off"
                spellCheck="false"
                placeholder={addBy === 'instagram' ? 'Search for instagram user' : "Add traveller's name"}
            />

            <Add onClick={addPersonViaInstagramOrManually}>{addBy === 'instagram' ? 'Search' : 'Add traveller'}</Add>

            {newTraveller && (
                <InstagramPlaceholder>
                    <img src={newTraveller.photo} width="75" height="75" alt="" />
                    <div>{newTraveller.username}</div>
                    <div
                        onClick={addTraveller}
                        style={{
                            background: KIERAN_GREY,
                            borderRadius: '10px',
                            color: '#fff',
                            padding: '10px',
                        }}
                    >
                        Add person to trip
                    </div>
                </InstagramPlaceholder>
            )}
        </SearchContainer>
    )
}
