import * as react_jsx_runtime from 'react/jsx-runtime';
import * as react from 'react';
import { TypographyProps } from '@mui/material';
import { WalletUnlocked } from 'fuels';

type OnboardingFlowProps = {
    container?: Element | (() => Element | null) | null;
    welcomeMessage?: React.ReactNode;
};
declare const OnboardingFlow: ({ container, welcomeMessage }: OnboardingFlowProps) => react_jsx_runtime.JSX.Element;

type OnboardingFlowContextType = {
    openDialog: boolean;
    setOpenDialog: (open: boolean) => void;
};
declare const OnboardingFlowContext: react.Context<OnboardingFlowContextType | null>;
declare const useOnboardingFlowContext: () => OnboardingFlowContextType;
declare const OnboardingFlowProvider: ({ children, }: {
    children: React.ReactNode;
}) => react_jsx_runtime.JSX.Element;

type TextProps = TypographyProps;
declare const Text: ({ children, className, ...props }: TextProps) => react_jsx_runtime.JSX.Element;

interface ThemeToggleProps {
    isDarkMode: boolean;
    setIsDarkMode: (darkMode: boolean) => void;
}
declare const ThemeToggle: ({ isDarkMode, setIsDarkMode }: ThemeToggleProps) => react_jsx_runtime.JSX.Element;

declare const useBreakpoints: () => {
    isMobile: boolean;
    isTablet: boolean;
};

declare const useFaucet: (fuelNodePort?: number, privateKey?: string) => {
    faucetWallet: WalletUnlocked | undefined;
};

export { OnboardingFlow, OnboardingFlowContext, type OnboardingFlowContextType, OnboardingFlowProvider, Text, ThemeToggle, useBreakpoints, useFaucet, useOnboardingFlowContext };
