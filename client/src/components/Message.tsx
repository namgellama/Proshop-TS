import { ReactNode } from 'react';
import { Alert } from 'react-bootstrap';

interface Props {
	variant?: string;
	children: ReactNode;
}

const Message = ({ variant = 'info', children }: Props) => {
	return <Alert variant={variant}>{children}</Alert>;
};

export default Message;
