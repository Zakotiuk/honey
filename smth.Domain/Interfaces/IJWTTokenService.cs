using schoolButNot.Access;

namespace schoolButNot.Domain.Implements
{
    public interface IJWTTokenService
    {
        string CreateToken(ApplicationUser user);
    }
}