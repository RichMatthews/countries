import React from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'

// import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    color: #ccc;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
`

const Achievement = styled.div`
    background: #fff;
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
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: true },
    { title: 'Antartic Adventurer', description: 'You have been to the antarctic', achieved: false },
    { title: 'French Baguette', description: 'You conquered France!', achieved: false },
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: true },
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: false },
    { title: 'French Baguette', description: 'You conquered France!', achieved: false },
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: true },
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: false },
    { title: 'French Baguette', description: 'You conquered France!', achieved: false },
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: true },
    { title: 'Continent Crusader', description: 'You have been to all continents', achieved: false },
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
