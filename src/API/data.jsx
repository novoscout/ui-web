import { h, Fragment } from "preact"

const articles = [
  (
    <Fragment>
      <h2></h2>
      <hr/>
      <p>
        <a>Author</a>
      </p>
      <hr/>
      <p>
        Summary
      </p>
    </Fragment>
  ),
  (
    <Fragment>
      <h2>Manual therapy for unsettled, distressed and excessively crying infants: a systematic review and meta-analyses</h2>
      <hr/>
      <p>
        <a>Dawn Carnes</a> <a>Austin Plunkett</a> <a>Julie Ellwood</a> <a>Clare Miles</a>
      </p>
      <hr/>
      <p>
        Meaningful outcomes for parents with distressed, unsettled and excessively crying infants were investigated to help inform their decisions about seeking manual therapy care for their infants.
      </p>
      <p>
        We found moderate strength evidence for the effectiveness of manual therapy on: reduction in crying time, sleep, parent–child relations and global improvement.
      </p>
      <p>
        Some small benefits were found, but whether these are meaningful to parents remains unclear as does the mechanisms of action. Manual therapy appears relatively safe.
      </p>
    </Fragment>
  ),
  (
    <Fragment>
      <h2>Multidisciplinary biopsychosocial rehabilitation for chronic low back pain: Cochrane systematic review and meta-analysis</h2>
      <hr/>
      <p>
        <a>Steven J Kamper</a> <a>A T Apeldoorn</a> <a>A Chiarotto</a> <a>R J E M Smeets</a> <a>R W J G Ostelo</a> <a>J Guzman</a> <a>M W van Tulder</a>
      </p>
      <hr/>
      <p>
        Multidisciplinary biopsychosocial rehabilitation interventions were more effective than usual care and physical treatments in decreasing pain and disability in people with chronic low back pain. For work outcomes, multidisciplinary rehabilitation seems to be more effective than physical treatment but not more effective than usual care.
      </p>
    </Fragment>
  )
]

export default articles
export { articles }
