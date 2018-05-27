import * as React from "react"
import { storiesOf } from "@storybook/react"
import { SurveyResultDetail } from "@amped/types"
import { SurveyDetail, SurveyDetailProps } from "@amped/components"

storiesOf("SurveyDetail", module)
  .add("No Data", () => {
    const props: SurveyDetailProps = {
      detail: undefined
    }
    return <SurveyDetail {...props} />
  })
  .add("Data Pending", () => {
    const props: SurveyDetailProps = {
      detail: {}
    }
    return <SurveyDetail {...props} />
  })
