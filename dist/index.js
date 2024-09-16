// src/components/OnboardingFlow.tsx
import { Box as Box3, Dialog, DialogContent, Stack as Stack3 } from "@mui/material";
import { useEffect as useEffect3, useState as useState4 } from "react";

// src/components/WelcomePage.tsx
import { Box as Box2, Button, Stack } from "@mui/material";
import {
  useConnectUI,
  useConnect,
  useIsConnected,
  useWallet,
  useBalance
} from "@fuels/react";
import { useEffect } from "react";

// src/components/Text.tsx
import { Typography } from "@mui/material";
import { jsx } from "react/jsx-runtime";
var Text = ({ children, className, ...props }) => {
  return /* @__PURE__ */ jsx(Typography, { ...props, className: `text-black dark:text-white font-sans ${className}`, children });
};

// src/components/OnboardingTopBar.tsx
import { Box } from "@mui/material";
import { jsx as jsx2, jsxs } from "react/jsx-runtime";
var OnboardingTopBar = ({ currentStep }) => {
  return /* @__PURE__ */ jsxs(Box, { className: "flex w-full items-center justify-around", children: [
    /* @__PURE__ */ jsx2(
      Text,
      {
        className: currentStep === 0 /* Welcome */ ? "" : "!text-slate-600",
        children: "1. Welcome"
      }
    ),
    /* @__PURE__ */ jsx2(
      Text,
      {
        className: currentStep === 1 /* Faucet */ ? "" : "!text-slate-600",
        children: "2. Faucet"
      }
    ),
    /* @__PURE__ */ jsx2(
      Text,
      {
        className: currentStep === 2 /* Success */ ? "" : "!text-slate-600",
        children: "3. Success"
      }
    )
  ] });
};

// src/utils/isSafari.ts
var isSafari = /^((?!chrome|android).)*safari/i.test(navigator.userAgent);

// src/components/WelcomePage.tsx
import { Fragment, jsx as jsx3, jsxs as jsxs2 } from "react/jsx-runtime";
var WelcomePage = ({
  message,
  setCurrentStep
}) => {
  const { connect: connectUI } = useConnectUI();
  const { connect: connectBurner } = useConnect();
  const {
    wallet,
    isLoading: isLoadingWallet,
    isPending: isPendingWallet,
    isFetching: isFetchingWallet
  } = useWallet();
  const {
    balance,
    isFetching: isFetchingBalance,
    isPending: isPendingBalance,
    isLoading: isLoadingBalance
  } = useBalance({
    address: wallet?.address.toString()
  });
  const { isConnected } = useIsConnected();
  const isBalanceLoading = isFetchingBalance || isPendingBalance || isLoadingBalance;
  const isWalletLoading = isLoadingWallet || isPendingWallet || isFetchingWallet;
  useEffect(() => {
    if (isConnected && wallet) {
      if (balance && balance.gt(0)) {
        setCurrentStep(2 /* Success */);
      } else if (!isBalanceLoading) {
        if (isSafari) {
          const redirectUrl = new URL("https://faucet-testnet.fuel.network/");
          redirectUrl.searchParams.append("address", wallet.address.toString());
          redirectUrl.searchParams.append("redirectUrl", window.location.href);
          window.location.href = redirectUrl.href;
        } else {
          setCurrentStep(1 /* Faucet */);
        }
      }
    }
  }, [isConnected, wallet, balance, isBalanceLoading]);
  return /* @__PURE__ */ jsxs2(Stack, { spacing: 3, className: "w-5/6 items-center", children: [
    message,
    isWalletLoading ? /* @__PURE__ */ jsx3(Text, { children: "Loading..." }) : /* @__PURE__ */ jsxs2(Fragment, { children: [
      /* @__PURE__ */ jsx3(
        Button,
        {
          className: "btn-primary h-12 w-full text-black",
          onClick: () => {
            connectBurner("Burner Wallet");
          },
          children: "Temporary Wallet"
        }
      ),
      /* @__PURE__ */ jsx3(Box2, { className: "border-b-2 border-slate-600 w-full" }),
      /* @__PURE__ */ jsx3(
        Button,
        {
          variant: "outlined",
          className: "text-black dark:text-white h-12 w-full border-slate-600",
          onClick: () => {
            connectUI();
          },
          children: "Connect"
        }
      )
    ] })
  ] });
};

// src/components/FaucetPage.tsx
import { useWallet as useWallet2, useBalance as useBalance2 } from "@fuels/react";
import { useEffect as useEffect2, useState as useState2 } from "react";
import { Button as Button2 } from "@mui/material";

// src/config.ts
var TESTNET_FAUCET_LINK = "https://faucet-testnet.fuel.network/";

// src/hooks/useBreakpoints.ts
import { useMedia } from "react-use";
var useBreakpoints = () => {
  const isMobile = useMedia("(max-width: 640px)", false);
  const isTablet = useMedia("(max-width: 768px)", true);
  return { isMobile, isTablet };
};

// src/hooks/useFaucet.tsx
import { Provider, Wallet } from "fuels";
import { useState } from "react";
import useAsync from "react-use/lib/useAsync";
var useFaucet = (fuelNodePort = 4e3, privateKey = "0x01") => {
  const [faucetWallet, setFaucetWallet] = useState();
  useAsync(async () => {
    if (!faucetWallet) {
      const provider = await Provider.create(
        `http://127.0.0.1:${fuelNodePort}/v1/graphql`
      );
      const wallet = Wallet.fromPrivateKey(privateKey, provider);
      setFaucetWallet(wallet);
    }
  }, [faucetWallet]);
  return {
    faucetWallet
  };
};

// src/components/FaucetPage.tsx
import { jsx as jsx4 } from "react/jsx-runtime";
var TOP_UP_AMOUNT = 1e8;
var FaucetPage = ({ setCurrentStep }) => {
  const {
    wallet,
    isLoading: isLoadingWallet,
    isPending: isPendingWallet,
    isFetching: isFetchingWallet
  } = useWallet2();
  const {
    isPending: isPendingBalance,
    isLoading: isLoadingBalance,
    isFetching: isFetchingBalance
  } = useBalance2({ address: wallet?.address.toString() });
  const { faucetWallet } = useFaucet();
  const IS_LOCAL = import.meta.env.VITE_PUBLIC_DAPP_ENVIRONMENT === "local";
  const topUpWallet = async () => {
    if (IS_LOCAL) {
      if (!faucetWallet) {
        throw new Error("Faucet wallet not found.");
      }
      if (!wallet) {
        throw new Error("Wallet not found.");
      }
      const tx = await faucetWallet?.transfer(wallet.address, TOP_UP_AMOUNT);
      await tx?.waitForResult();
    }
  };
  const [className, setClassName] = useState2("");
  const isLoading = isLoadingWallet || isPendingWallet || isFetchingWallet || !wallet && (isPendingBalance || isLoadingBalance || isFetchingBalance);
  useEffect2(() => {
    const logo = document.getElementsByClassName("fuel-logo");
    if (logo) {
      setClassName("overflow-hidden h-[800px]");
    }
  }, []);
  if (isLoading) return /* @__PURE__ */ jsx4(Text, { children: "Loading..." });
  if (!wallet) return /* @__PURE__ */ jsx4(Text, { children: "Wallet not found" });
  if (IS_LOCAL) {
    return /* @__PURE__ */ jsx4(Button2, { className: "btn-primary h-12 w-3/4", onClick: () => topUpWallet(), children: "Faucet funds" });
  }
  return /* @__PURE__ */ jsx4(
    "iframe",
    {
      src: `${TESTNET_FAUCET_LINK}?address=${wallet.address.toAddress()}`,
      id: "test",
      width: "100%",
      height: "800px",
      className,
      children: "hello"
    }
  );
};

// src/components/SuccessPage.tsx
import { Button as Button3, Stack as Stack2 } from "@mui/material";

// src/components/OnboardingFlowProvider.tsx
import { createContext, useContext, useState as useState3 } from "react";
import { useIsConnected as useIsConnected2 } from "@fuels/react";
import { Toaster } from "react-hot-toast";
import { jsx as jsx5, jsxs as jsxs3 } from "react/jsx-runtime";
var OnboardingFlowContext = createContext(null);
var useOnboardingFlowContext = () => {
  const context = useContext(
    OnboardingFlowContext
  );
  if (!context) {
    throw new Error(
      "useOnboardingFlowContext must be used within OnboardingFlowProvider"
    );
  }
  return context;
};
var OnboardingFlowProvider = ({
  children
}) => {
  const { isConnected } = useIsConnected2();
  const [openDialog, setOpenDialog] = useState3(!isConnected);
  return /* @__PURE__ */ jsxs3(OnboardingFlowContext.Provider, { value: { openDialog, setOpenDialog }, children: [
    /* @__PURE__ */ jsx5(Toaster, {}),
    children
  ] });
};

// src/components/SuccessPage.tsx
import { jsx as jsx6, jsxs as jsxs4 } from "react/jsx-runtime";
var SuccessPage = ({ message }) => {
  const { setOpenDialog } = useOnboardingFlowContext();
  return /* @__PURE__ */ jsxs4(Stack2, { spacing: 2, className: "items-center w-full", children: [
    message && /* @__PURE__ */ jsx6(Text, { children: message }),
    /* @__PURE__ */ jsx6(
      Button3,
      {
        className: "btn-primary h-12 w-3/4 text-black",
        onClick: () => setOpenDialog(false),
        children: "Continue to App"
      }
    )
  ] });
};

// src/components/OnboardingFlow.tsx
import { useBalance as useBalance3, useWallet as useWallet3 } from "@fuels/react";
import { jsx as jsx7, jsxs as jsxs5 } from "react/jsx-runtime";
var OnboardingFlow = ({ container, welcomeMessage }) => {
  const { openDialog } = useOnboardingFlowContext();
  const [currentStep, setCurrentStep] = useState4(0 /* Welcome */);
  const { isMobile } = useBreakpoints();
  const { wallet } = useWallet3();
  const { balance, refetch: refetchBalance } = useBalance3({
    address: wallet?.address.toString()
  });
  useEffect3(() => {
    const interval = setInterval(refetchBalance, 500);
    if (balance && balance.gt(0)) {
      setCurrentStep(2 /* Success */);
    }
    return () => clearInterval(interval);
  }, [balance]);
  return /* @__PURE__ */ jsx7(
    Dialog,
    {
      fullScreen: isMobile,
      container,
      open: openDialog,
      id: "onboarding",
      PaperProps: { className: "p-8 w-full bg-zinc-200 dark:bg-black border-slate-600 border" },
      children: /* @__PURE__ */ jsx7(DialogContent, { children: /* @__PURE__ */ jsxs5(Stack3, { spacing: 4, className: "items-center", children: [
        /* @__PURE__ */ jsx7(OnboardingTopBar, { currentStep }),
        /* @__PURE__ */ jsx7(Box3, { className: "flex w-full justify-center items-center", children: currentStep === 0 /* Welcome */ ? /* @__PURE__ */ jsx7(
          WelcomePage,
          {
            message: welcomeMessage,
            setCurrentStep
          }
        ) : currentStep === 1 /* Faucet */ ? /* @__PURE__ */ jsx7(FaucetPage, { setCurrentStep }) : /* @__PURE__ */ jsx7(SuccessPage, { message: "Success!" }) })
      ] }) })
    }
  );
};

// src/components/ThemeToggle.tsx
import { styled } from "@mui/material/styles";
import Switch from "@mui/material/Switch";
import { Stack as Stack4 } from "@mui/material";
import { jsx as jsx8 } from "react/jsx-runtime";
var primaryPale = "#222";
var primaryLight = "#f0f0f0";
var BaseSwitch = styled(Switch)({
  width: 45,
  height: 22,
  padding: 0,
  display: "flex",
  "& .MuiSwitch-switchBase": {
    padding: 2,
    "&.Mui-checked": {
      transform: "translateX(23px)",
      "& + .MuiSwitch-track": {
        opacity: 1,
        backgroundColor: primaryPale
      }
    }
  },
  "& .MuiSwitch-thumb": {
    width: 18,
    height: 18,
    borderRadius: "25px",
    backgroundColor: "transparent",
    boxShadow: "none"
  },
  "& .MuiSwitch-track": {
    opacity: 1,
    borderRadius: "25px",
    backgroundColor: primaryLight,
    boxSizing: "border-box"
  }
});
var SwitchWithIcons = styled(BaseSwitch)({
  "& .MuiSwitch-track": {
    "&:before, &:after": {
      content: '""',
      position: "absolute",
      transform: "translateY(-50%)",
      width: 16,
      height: 16,
      top: 11
    },
    "&:before": {
      left: 3
    },
    "&:after": {
      right: 3
    }
  },
  "& .MuiSwitch-thumb:before": {
    content: "''",
    position: "absolute",
    width: "100%",
    height: "100%",
    left: 0,
    top: 0,
    backgroundRepeat: "no-repeat",
    backgroundPosition: "center",
    backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
      "#4c4949"
    )}" d="M9.305 1.667V3.75h1.389V1.667h-1.39zm-4.707 1.95l-.982.982L5.09 6.072l.982-.982-1.473-1.473zm10.802 0L13.927 5.09l.982.982 1.473-1.473-.982-.982zM10 5.139a4.872 4.872 0 00-4.862 4.86A4.872 4.872 0 0010 14.862 4.872 4.872 0 0014.86 10 4.872 4.872 0 0010 5.139zm0 1.389A3.462 3.462 0 0113.471 10a3.462 3.462 0 01-3.473 3.472A3.462 3.462 0 016.527 10 3.462 3.462 0 0110 6.528zM1.665 9.305v1.39h2.083v-1.39H1.666zm14.583 0v1.39h2.084v-1.39h-2.084zM5.09 13.928L3.616 15.4l.982.982 1.473-1.473-.982-.982zm9.82 0l-.982.982 1.473 1.473.982-.982-1.473-1.473zM9.305 16.25v2.083h1.389V16.25h-1.39z"/></svg>')`
  },
  "& .MuiSwitch-switchBase": {
    "&.Mui-checked": {
      "& .MuiSwitch-thumb:before": {
        content: "''",
        position: "absolute",
        width: "100%",
        height: "100%",
        left: 0,
        top: 0,
        backgroundRepeat: "no-repeat",
        backgroundPosition: "center",
        backgroundImage: `url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" height="16" width="16" viewBox="0 0 20 20"><path fill="${encodeURIComponent(
          "#fff"
        )}" d="M4.2 2.5l-.7 1.8-1.8.7 1.8.7.7 1.8.6-1.8L6.7 5l-1.9-.7-.6-1.8zm15 8.3a6.7 6.7 0 11-6.6-6.6 5.8 5.8 0 006.6 6.6z"/></svg>')`
      }
    }
  }
});
var ThemeToggle = ({ isDarkMode, setIsDarkMode }) => {
  return /* @__PURE__ */ jsx8(Stack4, { children: /* @__PURE__ */ jsx8(
    SwitchWithIcons,
    {
      checked: isDarkMode,
      onChange: () => setIsDarkMode(!isDarkMode)
    }
  ) });
};
export {
  OnboardingFlow,
  OnboardingFlowContext,
  OnboardingFlowProvider,
  Text,
  ThemeToggle,
  useBreakpoints,
  useFaucet,
  useOnboardingFlowContext
};
//# sourceMappingURL=index.js.map