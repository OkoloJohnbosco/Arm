import IfElse from 'components/if-else'
import Loading from 'components/Loading'
import { useAnswerRiskProfilingQuestion } from 'modules/hooks/risk/useApiPostRiskProfilingQuestion'
import { useRiskProfilingQuestion } from 'modules/hooks/useRiskProfilingQuestion'
import React, { useEffect, useState } from 'react'
import Typing from 'components/animations/Typing'
import { ProfileQuestionType, RiskAssesmentScreenProps, RiskAssessmentStage, RiskProfileQuestionResponse, RiskProfileQuestionType } from '../type'
import Questions from '../question'
import Body from 'components/typography/Body'
import { Flex } from '@chakra-ui/layout'
import Small from 'components/typography/Small'
import LoadingWrapper from 'components/layout/loading-wrapper'
import { Link, animateScroll, scroller } from 'react-scroll'
import { Box, Stack } from '@chakra-ui/react'

import Button from 'components/button/Button'
import { scrollToSelector } from 'utils/helpers'

export default (props: RiskAssesmentScreenProps) => {
	const [isTyping, setIsTyping] = useState<boolean>(false)
	const [currentStage, setCurrentStage] = useState<RiskAssessmentStage>(RiskAssessmentStage.PreOnboarding)
	const [riskProfileQuestions, setRiskProfileQuestions] = useState<Record<RiskAssessmentStage, RiskProfileQuestionType>>({
		[RiskAssessmentStage.PreOnboarding]: { questions: [], stage: { id: 0, name: RiskAssessmentStage.PreOnboarding } },
		[RiskAssessmentStage.Pensions]: { questions: [], stage: { id: 0, name: RiskAssessmentStage.Pensions } },
		[RiskAssessmentStage.Retail]: { questions: [], stage: { id: 0, name: RiskAssessmentStage.Retail } },
		[RiskAssessmentStage.WRM]: { questions: [], stage: { id: 0, name: RiskAssessmentStage.WRM } },
	})

	const [completedQuestion, setCompletedQuestion] = useState<Record<RiskAssessmentStage, Array<RiskProfileQuestionResponse>>>({
		[RiskAssessmentStage.PreOnboarding]: [],
		[RiskAssessmentStage.Pensions]: [],
		[RiskAssessmentStage.Retail]: [],
		[RiskAssessmentStage.WRM]: [],
	})

	console.log(riskProfileQuestions, 'riskProfileQuestions')

	console.log(completedQuestion, 'completedQuestion')
	const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0)

	const answerRiskQuestion = useAnswerRiskProfilingQuestion()

	const { value: riskProfileQuestion } = useRiskProfilingQuestion(currentStage)
	console.log(riskProfileQuestion, 'riskProfileQuestion')
	useEffect(() => {
		riskProfileQuestion && setRiskProfileQuestions({ ...riskProfileQuestions, [currentStage]: riskProfileQuestion.stage_questions })
	}, [riskProfileQuestion])

	const stageRiskProfileQuestions = riskProfileQuestions[currentStage]

	const saveRiskQuestion = async () => {
		return answerRiskQuestion
			.mutateAsync(
				completedQuestion[currentStage].map((q) => ({
					question_id: q.question.id,
					option_id: isNaN(q.value) ? q.value : Number(q.value),
				}))
			)
			.then(({ data: { response_code, data } }) => {
				console.log(data, 'data')
				switch (response_code) {
					case 'S09':
						props.onComplete()
						break
					default:
						const riskQuestion = data.stage_questions
						setCurrentStage(riskQuestion.stage.name)
						setRiskProfileQuestions({ ...riskProfileQuestions, [riskQuestion.stage.name]: riskQuestion })
						setCurrentQuestionIndex(0)
					//console.log(data.data)
				}
			})
	}

	const updateQuestionResponse = (value: any, assesmentStage: RiskAssessmentStage) => {}

	const onChange = (changedQuestion: ProfileQuestionType, value: any) => {
		const stageCompletedQuestions = completedQuestion[currentStage]
		const updateIndex = stageCompletedQuestions.findIndex(({ question }) => question.id == changedQuestion.id)
		setIsTyping(true)

		if (updateIndex !== -1) {
			//update Question response
			const updatedQuestion = stageCompletedQuestions[updateIndex]
			updatedQuestion.value = value
			stageCompletedQuestions.splice(updateIndex, 1, updatedQuestion)
			completedQuestion[currentStage] = stageCompletedQuestions
			setCompletedQuestion({ ...completedQuestion })
		} else {
			//Save new question response
			stageCompletedQuestions.push({ question: changedQuestion, value })

			// completedQuestion[questionStage] = stageQuestions
			// setCompletedQuestion({ ...completedQuestion })
			setCurrentQuestionIndex(currentQuestionIndex + 1)
		}
		scrollToSelector('.div1')
		setTimeout(() => {
			setIsTyping(false)
			scrollToSelector('.div1')
		}, 1500)
	}

	useEffect(() => {
		if (completedQuestion[currentStage].length && completedQuestion[currentStage].length === riskProfileQuestions[currentStage]?.questions.length) {
			//All Questions in this risk stage have been answered, send them to the API
			saveRiskQuestion()
		}
	}, [completedQuestion[currentStage].length])

	return (
		<>
			{completedQuestion[currentStage].map((question, i) => (
				<Questions
					key={i}
					onChange={onChange}
					question={question.question}
					value={question.question.options.find((option) => option.id == question.value)?.text || question.value}
				/>
			))}
			<LoadingWrapper isLoading={!(currentQuestionIndex < stageRiskProfileQuestions?.questions.length)}>
				<IfElse
					ifOn={isTyping}
					elseThen={
						<Box className="div1" transition="all 2.s ease-in-out" opacity={isTyping ? 0 : 1}>
							<Questions onChange={onChange} question={stageRiskProfileQuestions.questions[currentQuestionIndex]} />
						</Box>
					}
				>
					<Flex px={{ md: 12, base: 4 }} align="center" className="div1">
						<Typing />
						<Small ml="-6" variant="semibold12" alt>
							Typing
						</Small>
					</Flex>
				</IfElse>
			</LoadingWrapper>
		</>
	)
}
