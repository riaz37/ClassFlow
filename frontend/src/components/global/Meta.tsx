import { Helmet } from "react-helmet-async";

interface MetaProps {
    title?: string;
    description?: string;
    children?: React.ReactNode;
}

const APP_NAME = "Edunexus";
const DEFAULT_DESCRIPTION = "School Management System";

export const Meta = ({ title, description, children }: MetaProps) => {
    return (
        <Helmet>
            <title>{title ? `${title} | ${APP_NAME}` : APP_NAME}</title>
            <meta name="description" content={description || DEFAULT_DESCRIPTION} />
            {children}
        </Helmet>
    );
};
