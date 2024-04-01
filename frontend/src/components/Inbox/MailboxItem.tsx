import { useDispatch } from 'react-redux';
import { useSelector } from 'react-redux';
import { readStatusUpdateThunk } from '../../store/mailboxSlice';
interface mailObj {
    _id: string,
    recipient: string,
    sender: string,
    subject: string,
    body: string,
    isRead: boolean,
    createdDate: string,
    updatedDate: string,
}
interface inboxItemProps{
    data: mailObj,
    onSelectMail: Function;
}
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



function MailboxItem(props: inboxItemProps) {
    const token = useSelector((state: AuthState) => state.auth.token);
    const emailDate: Date = new Date(props.data.createdDate);
    const isRead: boolean = props.data.isRead;
    const dispatch = useDispatch<any>();

    const showMail = async() => {
        if(token){
            try{
                props.onSelectMail();
                if(!props.data.isRead)
                    await dispatch(readStatusUpdateThunk(token, props.data._id));
            }
            catch(err: any){
                console.log(err);
                alert(`Error-${err?.response?.data?.message}`); 
            }
        }
    }


    return (
        <li className='border border-1 d-flex p-2 btn btn-light rounded-0 ' onClick={showMail}>
                <div id="readStatus" className=''>
                    <i className={`ri-circle-fill ${isRead ? 'text-light' : 'text-success '} border rounded-5 border-3 `}></i>
                </div>
                <div className='d-flex flex-column '>
                    <span className='fw-bold'>{props.data.sender}</span>
                    <div className='overflow-hidden '><span className='fw-bold me-2 '>{props.data.subject}</span> {props.data.body} </div>
                </div>
                <div className='ms-auto'>{emailDate.toISOString()}</div>
        </li>
    )
}

export default MailboxItem