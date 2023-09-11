import * as React from "react";
import Accordion from "@mui/material/Accordion";
import AccordionSummary from "@mui/material/AccordionSummary";
import AccordionDetails from "@mui/material/AccordionDetails";
import Typography from "@mui/material/Typography";
import ExpandMoreIcon from "@mui/icons-material/ExpandMore";

import { faqsData } from "dh-marvel/components/faqs/faqsData";
import { GetStaticProps } from "next";
import styles from './faqs.module.css'

const Faqs = ({ data }: any) =>  {
  return (
    <div className={styles.faqs__container}>
      <Typography variant="h4">Preguntas Frecuentes</Typography>
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
  );
}
export default Faqs

export const getStaticProps: GetStaticProps = async () => {
  const data = faqsData;
  return { props: { data } };
};
