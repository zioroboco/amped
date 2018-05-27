import * as React from "react"
import { connect, Dispatch } from "react-redux"
import { asyncFetchDetail } from "./redux/actions"
import { State } from "./redux/store"

type DispatchProps = {
  requestDetailAtIndex: (index: number) => void
}

const mapStateToProps = (state: State) => ({ state })

const mapDispatchToProps = (dispatch: Dispatch): DispatchProps => ({
  requestDetailAtIndex: index => asyncFetchDetail(index)(dispatch)
})

const Container = (props: State & DispatchProps) => {
  const handleRequestDetailAtIndex = (index: number) => {
    return () => props.requestDetailAtIndex(index)
  }
  return <div />
}

export default connect(mapStateToProps, mapDispatchToProps)(Container)

export { Container }
