import {Fade, Grow, Tooltip, Zoom} from "@mui/material";
import {AppConfigState} from "../../store/slices/appConfigSlice";
import {RootState} from "../../store";
import {useSelector} from "react-redux";

interface ITooltipsFinanceoProps {
    placement?: "top" | "bottom" | "left" | "right" | any;
    title: string | any;
    children: any;
    transitions?: 'zoom' | 'fade' | 'grow';
    followCursor?: boolean;
    arrow?: boolean;
}

export function TooltipFinanceo(props: ITooltipsFinanceoProps) {
    const appConfig: AppConfigState = useSelector((state: RootState) => state.appConfig);

    return (
        <Tooltip
            arrow={props.arrow ?? false}
            disableHoverListener={appConfig.toolTipsEnabled}
            followCursor={props.followCursor ?? true}
            TransitionComponent={props?.transitions === 'grow' ? Grow : props?.transitions === 'fade' ? Fade : Zoom}
            title={props.title}
            placement={props.placement ?? 'top'}>
            {
                props.children
            }
        </Tooltip>
    )
}
