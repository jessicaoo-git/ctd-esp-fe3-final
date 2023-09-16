import { render } from '@testing-library/react';
import Faqs from './index.page';
import { FaqsType } from 'dh-marvel/components/faqs/faqsData';

describe('Faqs', () => {
    const data: FaqsType[] = [
        {
            id: 1,
            question: 'Question1?',
            answer: 'Answer2',
        },
        {
            id: 2,
            question: 'Question2?',
            answer: 'Answer2',
        },
    ];
    it('renders correctly', () => {
        const { getByText } = render(<Faqs data={data} />);
        expect(getByText('Preguntas Frecuentes')).toBeInTheDocument();
    });
});