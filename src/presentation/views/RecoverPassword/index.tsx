import { FormProvider } from "react-hook-form";
import { useNavigate } from "@tanstack/react-router";
import { PasswordRecovery, UiNotification } from "@/domain/usecases";
import { Button } from "@/presentation/components/Button";
import { Input } from "@/presentation/components/Input";
import { MainPageWithImage } from "@/presentation/components/MainPageWithImage";
import { useFormWithZod } from "@/presentation/hooks/useFormWithZod";
import { usePasswordRecoveryMutation } from "@/presentation/views/RecoverPassword/common/hooks/usePasswordRecoveryMutation";
import {
  RecoverPasswordDto,
  recoverPasswordValidationSchema,
} from "@/presentation/views/RecoverPassword/common/validation/recoverPasswordValidationSchema";
import { RECOVER_PASSWORD_MESSAGE_ROUTE_URL } from "@/presentation/constants/routesUrl";

type RecoverPasswordProps = {
  passwordRecovery: PasswordRecovery;
  uiNotification: UiNotification;
};

export function RecoverPassword({
  passwordRecovery,
  uiNotification,
}: RecoverPasswordProps) {
  const form = useFormWithZod({ schema: recoverPasswordValidationSchema });

  const passwordRecoveryMutation = usePasswordRecoveryMutation({
    passwordRecovery,
  });

  const navigate = useNavigate();

  const handleRecoverPassword = form.handleSubmit(({ email }) => {
    passwordRecoveryMutation.mutate(
      { email },
      {
        onSuccess: () => navigate({ to: RECOVER_PASSWORD_MESSAGE_ROUTE_URL }),
        onError: (error) => uiNotification.error(error.message),
      },
    );
  });

  return (
    <MainPageWithImage title="Recuperar senha">
      <FormProvider {...form}>
        <form
          onSubmit={handleRecoverPassword}
          className="flex flex-col gap-4 *:w-full"
        >
          <Input<RecoverPasswordDto> name="email" placeholder="E-mail" />

          <Button
            type="submit"
            variant="outlined"
            size="large"
            loading={passwordRecoveryMutation.isPending}
          >
            Confirmar
          </Button>
        </form>
      </FormProvider>
    </MainPageWithImage>
  );
}
