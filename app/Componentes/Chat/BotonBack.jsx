import { Button } from '@nextui-org/react';
import { useRouter } from 'next/navigation';
import IconArrowLeft from '@/app/Icons/IconArrowLeft';

const BackButton = () => {
    const router = useRouter();

    return (
        <Button color="default" auto isIconOnly variant='flat' onClick={() => router.back()}>
            <IconArrowLeft className="text-slate-300" />
        </Button>
    );
};

export default BackButton;