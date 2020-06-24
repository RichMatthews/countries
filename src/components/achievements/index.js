import React, { useEffect, useState } from 'react'
import { connect } from 'react-redux'
import styled from 'styled-components'
import { Emoji } from 'emoji-mart'

import { ACHIEVEMENTS_LIST } from 'constants/achievements-list'
import { KIERAN_GREY } from 'styles'

const Container = styled.div`
    align-items: center;
    background: #e1e3e3;
    color: ${KIERAN_GREY};
    display: flex;
    flex-direction: column;
    height: 100%;
    padding-top: 10px;
`

const Achievement = styled.div`
    align-items: center;
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

    @media (max-width: 700px) {
        width: auto;
    }
`

const Top = styled.div`
    align-items: center;
    display: flex;
    flex-direction: row;
    border-bottom: 1px solid #c9c9c9;
    margin-bottom: 20px;
    justify-content: space-between;

    @media (max-width: 700px) {
        margin: 10px;
    }
`

const Bottom = styled.div`
    ::-webkit-scrollbar-thumb {
        background: #a2a6a6;
        border-radius: 10px;
    }
    ::-webkit-scrollbar {
        background: #c7c9c9;
        width: 10px;
    }
    overflow-y: auto;
    height: 550px;

    @media (max-width: 700px) {
        height: auto;
        margin: 20px;
        overflow-y: auto;
    }

    @media (max-width: 700px) {
        height: auto;
        margin: 20px;
        overflow-y: auto;
    }
`

const AchievementsList = styled.div`
    height: 100%;

    @media (max-width: 700px) {
        margin-top: 100px;
        width: 100%;
    }
`

const Achieved = styled.div`
    width: 40px;
    & > img {
        width: 40px;
    }
`

const Title = styled.div`
    color: #4a4947;
    font-size: 48px;
    margin-bottom: 20px;
    margin: 0;

    @media (max-width: 700px) {
        font-size: 32px;
    }
`

const AchievementsContainer = ({ user }) => {
    const [achievements, setAchievements] = useState(ACHIEVEMENTS_LIST)

    useEffect(() => {
        setAchievements(achievements.map((obj) => user.achievements.find((o) => o.title === obj.title) || obj))
    }, [user.achievements])

    return (
        <Container>
            <AchievementsList>
                <Top>
                    <Title>Your Achievements</Title>
                    <div>
                        {achievements.filter((achievement) => achievement.achieved).length} / {achievements.length}
                    </div>
                </Top>
                <Bottom>
                    {achievements.map((achievement) => (
                        <Achievement key={achievement.title} achieved={achievement.achieved}>
                            <div>
                                <h2 style={{ margin: 0 }}>{achievement.title}</h2>
                                <div>{achievement.description}</div>
                            </div>
                            {achievement.achieved ? (
                                <Achieved>
                                    <Emoji emoji={{ id: achievement.emojiId }} size={42} />
                                </Achieved>
                            ) : (
                                <Achieved>
                                    <img src={'/images/lock.png'} alt="" />
                                </Achieved>
                            )}
                        </Achievement>
                    ))}
                </Bottom>
            </AchievementsList>
        </Container>
    )
}

const mapState = ({ user }) => ({
    user,
})

export const CONNECTED_Achievments = connect(mapState)(AchievementsContainer)
