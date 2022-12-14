import Layout from '../../components/layout';
import Link from 'next/link'
import { getAllSituationIds, getSituationData } from '../../utils/situations'
import styles from '../../styles/Home.module.css'
import Draggable
 from 'react-draggable';
export default function Situation({ situationData }) {
    console.log(JSON.stringify(situationData, null, 4))
    return (
      <Layout>
        <div style={{
          width: "50%",
          margin: "auto",
          marginTop: "100px"
        }}>
          <Draggable>
          <div style={{
            cursor: "pointer"
          }}>
              <h1>{situationData.fields.Title}</h1>
              <p>{situationData.fields.Text}</p>
          </div>
          </Draggable>
          <div className={styles.grid}>
            {situationData.fields.ChoicesButtonText.map((e, i)=>{
              return(
                <Link href={`/situations/${situationData.fields.ChoicesLeadsToSituation[i]}`} key={i}>
                  <a className={styles.card}>
                <h3>{e} &rarr;</h3>
                <p>{situationData.fields.ChoicesAvailable_Text[i]}</p>
            </a>
                  
                </Link>
              )
            })}

        </div>
        </div>
      </Layout>
    );
}

export async function getStaticPaths() {
    const paths = await getAllSituationIds();
    return {
      paths,
      fallback: false,
    };
  }

export async function getStaticProps({ params }) {
  console.log(`looking for data for ${params.id}`)
    const situationData = await getSituationData(params.id);
    return {
        props: {
          situationData,
        },
        revalidate: 10
    };
}

