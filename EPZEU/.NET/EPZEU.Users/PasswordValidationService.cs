namespace EPZEU.Users
{
    /// <summary>
    /// Интерфейс на услуга за валидиране на парола по генериран преди това хеш.
    /// </summary>
    public interface IPasswordValidationService
    {
        /// <summary>
        /// Валидиране чрез хеш.
        /// </summary>
        /// <param name="input">парола</param>
        /// <param name="passwordHash">хеш на парола</param>
        /// <returns></returns>
        bool ValidateWithHash(string input, string passwordHash);
    }

    /// <summary>
    /// Имплементация на IPasswordValidationService услуга за валидиране на парола по генериран преди това хеш.
    /// </summary>
    public class PasswordValidationService : IPasswordValidationService
    {
        public bool ValidateWithHash(string input, string passwordHash)
        {
            return BCrypt.Net.BCrypt.Verify(input, passwordHash);
        }
    }
}
