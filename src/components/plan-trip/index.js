import React, { useState } from 'react'
import styled from 'styled-components'

const Container = styled.div`
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    padding-top: 90px;
`

const Answer = styled.div`
    background-image: ${({ image }) => `url(${image})`};
    background-position: center;
    background-repeat: no-repeat;
    background-size: 250px;
    border-radius: 3px;
    height: 150px;
    width: 150px;
`

const Question = styled.div`
    font-size: 20px;
`

const QuestionAndAnswer = styled.div`
    display: flex;
    flex-direction: row;
    justify-content: space-around;
    width: 350px;
`

const questions = [
    {
        title: 'Hot or Cold?',
        options: [
            { title: 'Hot', img: '/images/plan-trip/hot.png' },
            { title: 'Cold', img: '/images/plan-trip/cold.png' },
        ],
    },
    {
        title: 'Visited or New?',
        options: [
            { title: 'Visited', img: '' },
            { title: 'New', img: '' },
        ],
    },
    {
        title: 'Close or Far?',
        options: [
            { title: 'Close', img: '' },
            { title: 'Far', img: '' },
        ],
    },
    {
        title: 'Solo or Company?',
        options: [
            { title: 'Solo', img: '' },
            { title: 'Company', img: '' },
        ],
    },
    {
        title: 'Long or Short?',
        options: [
            { title: 'Long', img: '' },
            { title: 'Short', img: '' },
        ],
    },
]

export const PlanTrip = () => {
    const [currentQuestion, setCurrentQuestion] = useState(0)
    return (
        <Container>
            <div>Plan a trip</div>
            <div>
                Welcome to trip planner! Here you can plan future trips and our clever algorithms will find you your
                ideal next adventure
            </div>
            {currentQuestion < 5 ? (
                <>
                    <Question>{questions[currentQuestion].title}</Question>
                    <QuestionAndAnswer>
                        {questions[currentQuestion].options.map((option) => (
                            <>
                                <Answer onClick={() => setCurrentQuestion(currentQuestion + 1)} image={option.img}>
                                    <div>{option.title}</div>
                                </Answer>
                            </>
                        ))}
                    </QuestionAndAnswer>
                </>
            ) : (
                <div>
                    <div>Hold tight, our travel toucans are finding you your pefect destination</div>
                    <div>SPAIN</div>
                    <div>is your next ideal holiday destination</div>
                </div>
            )}
        </Container>
    )
}
