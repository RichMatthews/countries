import React, { useEffect } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

const Container = styled.div`
    background-image: url(/images/wavy-bg.jpg);
    background-size: 100%;
    background-repeat: no-repeat;
    height: 15vh;
    padding-top: 100px;
`

const Inner = styled.div`
    align-items: center;
    display: flex;
    flex-direction: column;
    justify-content: center;
    padding-top: 85px;
`

const ProfilePhoto = styled.img`
    border-radius: 75px;
    height: 75px;
    width: 75px;
`

const UserName = styled.div`
    font-size: 20px;
`

const Location = styled.div`
    color: #b1b1b3;
    font-size: 16px;
`

const Bottom = styled.div`
    display: flex;
    flex-direction: column;
    height: 45vh;
    margin: auto;
    width: 90%;
`

const Section = styled.div`
    margin: 10px 0 10px 0;
    width: 100%;
`

const Heading = styled.div`
    border-bottom: 1px solid #b1b1b3;
    color: #414149;
    font-weight: bold;
    font-size: 20px;
`

const SectionContent = styled.div`
    color: #b1b1b3;
    display: flex;
    justify-content: space-between;
    padding: 10px 0 10px 0;
`

export const Account = ({ userPersonalDetails }) => {
    const { email, location, name, profilePhoto } = userPersonalDetails

    return Object.keys(userPersonalDetails).length ? (
        <Container>
            <Inner>
                <div>
                    <ProfilePhoto src={profilePhoto} width="100" />
                </div>
                <UserName>{name}</UserName>
                <Location>{location.city}</Location>
            </Inner>
            <Bottom>
                <Section>
                    <Heading>Profile Settings</Heading>
                    <SectionContent>
                        <span>email</span> <span>{email}</span>
                    </SectionContent>
                </Section>

                <Section>
                    <Heading>Account Settings</Heading>
                    <SectionContent>
                        <span>email</span> <span>{email}</span>
                    </SectionContent>
                </Section>
            </Bottom>
        </Container>
    ) : (
        <div>Loading user profile...</div>
    )
}

const mapState = ({ userPersonalDetails }) => ({
    userPersonalDetails,
})

export const AccountContainer = connect(mapState)(Account)
