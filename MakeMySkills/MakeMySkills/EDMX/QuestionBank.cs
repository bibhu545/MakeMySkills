//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MakeMySkills.EDMX
{
    using System;
    using System.Collections.Generic;
    
    public partial class QuestionBank
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public QuestionBank()
        {
            this.UserResponses = new HashSet<UserResponse>();
        }
    
        public int QuestionId { get; set; }
        public string Question { get; set; }
        public int AnswerId { get; set; }
        public int TestId { get; set; }
        public int IsActive { get; set; }
        public int UserId { get; set; }
    
        public virtual AnswerBank AnswerBank { get; set; }
        public virtual User User { get; set; }
        public virtual Test Test { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<UserResponse> UserResponses { get; set; }
    }
}
