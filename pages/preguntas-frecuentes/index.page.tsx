import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";
import { faqsData, FaqsType } from 'dh-marvel/components/faqs/faqsData';
import { GetStaticProps } from "next";
import styles from './faqs.module.css';
import { NextPageWithLayout } from '../_app.page';
import BodySingle from "dh-marvel/components/layouts/body/single/body-single";
import LayoutGeneral from 'dh-marvel/components/layouts/layout-general';
import { ReactElement } from 'react';


interface Props {
  data: FaqsType[]
}

const Faqs: NextPageWithLayout<Props> = ({ data }: Props) =>  {
  return (
   <>
      
      <BodySingle title={"Preguntas Frecuentes"}>
      <div className={styles.faqs__container}>
        
        <div>
          {data?.map((faqs: any) => {
            return (
              <>
                <Accordion key={faqs.id}>
                  <AccordionSummary
                    expandIcon={<ExpandMoreIcon />}
                    aria-controls="panel1a-content"
                    id="panel1a-header"
                  >
                    <Typography className={styles.faqs__question}>{faqs.question}</Typography>
                  </AccordionSummary>
                  <AccordionDetails>
                    <Typography>
                      {faqs.answer}
                    </Typography>
                  </AccordionDetails>
                </Accordion>
               
              </>
            );
          })}
        </div>
      </div>
      </BodySingle>
    </>
  );
}


Faqs.getLayout = function getLayout(page: ReactElement) {
  return <LayoutGeneral>{page}</LayoutGeneral>
}

export const getStaticProps: GetStaticProps = async () => {
  const data = faqsData;
  return { props: { data } };
};

export default Faqs