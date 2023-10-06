interface ButtonProps {
  className?: string;
  dataTarget?: string;
  onClick?: () => void;
  children?: React.ReactNode | string;
}

export const Button: React.FC<ButtonProps> = ({
  className,
  dataTarget,
  onClick,
  children,
}) => {
  return (
    <button
      type="button"
      className={className}
      data-target={dataTarget}
      onClick={onClick}
    >
      {children}
    </button>
  );
};
