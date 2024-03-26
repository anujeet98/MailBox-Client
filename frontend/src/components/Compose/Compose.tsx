import React, { FormEvent, useRef, useState } from 'react'
import { Container, Form, Button } from 'react-bootstrap';
import MailEditor from './MailEditor';
import { EditorState } from 'draft-js';
import { useSelector } from 'react-redux';
interface AuthRes {
    email: string,
    idToken: string,
    expiresIn: string,
}
interface AuthState {
    auth: {
        isLoggedIn: boolean,
        userData: null | AuthRes,
        token: string | null,
    }
}

function Compose() {
    const [isSending, setIsSending] = useState(false);
    const [editorState, setEditorState] = useState(EditorState.createEmpty());
    const toRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const subjectRef: React.MutableRefObject<HTMLInputElement | null> = useRef(null);
    const senderEmail = useSelector((state: AuthState) => state.auth.userData?.email);

    const formSubmit = (event: FormEvent) => {
        event.preventDefault();
        setIsSending(true);
        const toEmail = toRef.current?.value;
        const subject = subjectRef.current?.value;
        const mailBody = editorState.getCurrentContent().getPlainText();
        console.log(senderEmail);


    }
    return (
        <Container fluid className='py-3 px-4'>
            <Button className='float-end btn-close '/><br></br>
            <Form className='d-flex flex-column gap-3' onSubmit={formSubmit}>
                <Form.Group className='border-bottom d-flex align-items-center p-2 '>
                    <Form.Label htmlFor='recipient' className='my-auto'>To</Form.Label>
                    <input type='email' id='recipient' ref={toRef} className='border-0 p-0 ms-3 w-100 ' style={{'outline':'none'}} placeholder='Recipients' required></input>
                </Form.Group>
                <Form.Group className='border-bottom p-2  '>
                    <input type='text' id='subject' ref={subjectRef} className='border-0 p-0 w-100 ' style={{'outline':'none'}} placeholder='Subject' required></input>
                </Form.Group>
                <Form.Group>
                    <MailEditor mailEditorState={editorState} onSetEditorState={(state: EditorState)=>setEditorState(state)} />
                </Form.Group>
                <div>
                    <Button type='submit' className='px-5'>{isSending ? 'Sending..' : 'Send'}</Button>
                </div>
            </Form>
        </Container>
    );
}

export default Compose