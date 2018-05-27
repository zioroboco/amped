import * as React from "react"
import { connect, Dispatch } from "react-redux"
import { asyncFetchDetail } from "./redux/actions"
import { State } from "./redux/store"
import { SurveyListProps } from "@amped/types"
import { SurveyList } from "@amped/components"

type DispatchProps = {
  requestDetailAtIndex: (index: number) => void
}

const mapStateToProps = (state: State) => ({ state })

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestDetailAtIndex: index => asyncFetchDetail(index)(dispatch)
})

const Container = (props: SurveyListProps & DispatchProps) => {
  const surveyListProps: SurveyListProps = {
    state: props.state,
    handleRequestDetailAtIndex: (index: number) => {
      return props.requestDetailAtIndex(index)
    }
  }
  return <SurveyList {...surveyListProps} />
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)

export { Container }
