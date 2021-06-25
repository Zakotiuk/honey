using Microsoft.AspNetCore.Identity;
using Microsoft.AspNetCore.Mvc.ModelBinding;
using System.Collections.Generic;
using System.Linq;

namespace schoolButNot.API.Helper
{
    public class CustomValidator
    {
        public static List<string> GetErrorsByIdentityResult(IdentityResult result)
        {
            var errors = new List<string>();

            foreach (var error in result.Errors)
            {
                errors.Add(error.Description);
            }

            return errors;
        }

        public static List<string> GetErrorsByModelState(ModelStateDictionary model)
        {
            var errors = new List<string>();

            var errorCollection = model.Where(t => t.Value.Errors.Count > 0).ToDictionary(
                v => v.Key,
                v => v.Value
                );

            foreach (var error in errorCollection)
            {
                errors.Add(error.Value.ToString());
            }

            return errors;
        }
    }
}