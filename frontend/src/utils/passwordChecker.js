export const isPasswordValid = ({
  currentPassword,
  newPassword,
  confirmPassword,
}) => {
  let isValid = true;

  if (!currentPassword) {
    toast.error("Le mot de passe actuel est requis");
    isValid = false;
  }

  if (!newPassword) {
    toast.error("Le nouveau mot de passe est requis");
    isValid = false;
  } else if (
    !/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/.test(
      newPassword
    )
  ) {
    toast.error(
      "Le mot de passe doit contenir au moins 8 caractères, dont une majuscule, une minuscule, un chiffre et un caractère spécial (@$!%*?&)"
    );
    isValid = false;
  }

  if (newPassword !== confirmPassword) {
    toast.error("Les mots de passe ne correspondent pas");
    isValid = false;
  }
  return { isValid };
};
