import React from 'react'
import styled from 'styled-components'

const EmojiSection = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-between;
    align-items: center;
    background: #fff;
    border: solid 1px #ccc;
    border-radius: 5px;
    height: 46px;
    margin-bottom: 20px;
    padding: 0 20px 0 15px;
    font-size: 15px;

    & > div {
        display: flex;
        alignitems: center;

        & > span {
            color: #9393a8;
        }
    }
`

export const Emoji = ({ chosenEmoji, setShowPicker, showPicker }) => (
    <EmojiSection>
        <div>
            <span>{!chosenEmoji ? 'Select an emoji to sum up your trip!' : null}</span>
            <span style={{ fontSize: '25px' }}>{chosenEmoji ? chosenEmoji : null} </span>
        </div>
        <img src={'/images/emojiselector.svg'} width={20} onClick={() => setShowPicker(!showPicker)} />
    </EmojiSection>
)
