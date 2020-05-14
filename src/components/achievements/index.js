import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Achievement = styled.div`
    background: #fff;
    border-radius: 10px;
    box-shadow: 0 4px 6px rgba(0, 0, 0, 0.1);
    color: #4a4947;
    display: flex;

    justify-content: space-between;
    margin-bottom: 20px;
    padding: 10px;
    opacity: ${({ achieved }) => (achieved ? 1 : 0.4)};
    width: 800px;
`

const Top = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    & > h2 {
        margin-right: 20px;
    }
`

const achievements = [
    { title: 'Antartic Adventurer', description: 'You have been to Antartica', achieved: false },
    { title: 'Aussie! Aussie! Aussie!', description: 'You went to Straya mate', achieved: false },
    { title: 'Continent Crusader', description: 'You have been to all 7 continents', achieved: false },
    { title: 'First Country', description: 'You added your first country!', achieved: false },
    { title: 'French Baguette', description: 'You conquered France!', achieved: false },
    { title: 'Twenty Club', description: 'You have been to at least 20 countries', achieved: false },
    { title: 'US OF A', description: 'You have been to the USA', achieved: false },
]

const AchievementsContainer = () => (
    <Container>
        <Top>
            <h2>Achievements</h2>
            <div>
                {achievements.filter((achievement) => achievement.achieved).length} / {achievements.length}
            </div>
        </Top>
        <div style={{ height: '500px', overflowY: 'scroll' }}>
            {achievements.map((achievement) => (
                <Achievement achieved={achievement.achieved}>
                    <div>
                        <h2 style={{ margin: 0 }}>{achievement.title}</h2>
                        <div>{achievement.description}</div>
                    </div>
                    {achievement.achieved ? (
                        <div style={{ width: '40px' }}>
                            <img src={'/images/tada.png'} width="40px" />
                        </div>
                    ) : null}
                </Achievement>
            ))}
        </div>
    </Container>
)

const mapState = () => ({})

export const CONNECTED_Achievments = connect(mapState)(AchievementsContainer)
