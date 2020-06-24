import React from 'react'
import styled from 'styled-components'

const StyledAutoSizeInput = styled(AutosizeInput)`
    & > input {
        border: 1px solid #ff5a5f !important;
        border-radius: 5px !important;
        font-size: ${({ fontSize }) => fontSize} !important;
        margin: 15px; !important;
        padding: 10px !important;
        outline: none !important;
    }
`

export const EditMode = ({ visitDetails }) => {
    return (
        <div>
            <StyledAutoSizeInput
                fontSize="20px"
                placeholder={'Give the trip a memorable name'}
                value={visitDetails.visitName}
                onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'visitName')}
            />
            <DatePicker
                selected={new Date(visitDetails.startDate * 1000)}
                onChange={(date) => handleDate(date)}
                dateFormat="MMMM yyyy"
                showMonthYearPicker
                showFullMonthYearPicker
            />
            <PhotosAndInputContainer>
                <SearchContainers>
                    <SearchContainer>
                        <Search
                            onChange={(e) => setNewPerson(e.target.value)}
                            placeholder="Search for instagram user"
                        />
                        <Add onClick={searchForInstagramUser}>Search</Add>
                    </SearchContainer>
                    <SearchContainer>
                        <Search onChange={(e) => setNewPlace(e.target.value)} placeholder="Search for destination" />
                        <Add onClick={() => getLatLngForSpecificPlace(newPlace)}>Add destination to map</Add>
                    </SearchContainer>
                </SearchContainers>
                <PhotoPlaceholder>
                    <Label class="custom-file-upload">
                        <input type="file" onChange={onDrop} />
                        Add photos
                    </Label>
                </PhotoPlaceholder>
            </PhotosAndInputContainer>
            <Description>
                <TextareaAutosize
                    onChange={(e) => updateVisitDetailsStateHelper(e, 0, 'description')}
                    placeholder="Say a few words to describe the trip"
                    rows={3}
                    style={{ border: 0, fontSize: '20px', width: '95%' }}
                    value={visitDetails.description}
                />
            </Description>
        </div>
    )
}
