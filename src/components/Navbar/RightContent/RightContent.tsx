import { Button, Flex, Menu } from '@chakra-ui/react';
import React from 'react';
import AutButtons from './AuthButtons';
import AuthModal from '../../Modal/Auth/AuthModal';
import { auth } from '@/src/firebase/clientApp';
import { User, signOut } from 'firebase/auth';
import Icons from './Icons';
import UserMenu from './UserMenu';

type RightContentProps = {
    user?: User | null;

};

const RightContent:React.FC<RightContentProps> = ({ user }) => {
    return (
        <>
        <AuthModal />
        <Flex justify='center' align='center' >
            {user ? <Icons /> : <AutButtons />}
          <UserMenu user={user} />
        </Flex>
        </>
    );
};
export default RightContent;