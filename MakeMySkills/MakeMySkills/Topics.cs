//------------------------------------------------------------------------------
// <auto-generated>
//     This code was generated from a template.
//
//     Manual changes to this file may cause unexpected behavior in your application.
//     Manual changes to this file will be overwritten if the code is regenerated.
// </auto-generated>
//------------------------------------------------------------------------------

namespace MakeMySkills
{
    using System;
    using System.Collections.Generic;
    
    public partial class Topics
    {
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2214:DoNotCallOverridableMethodsInConstructors")]
        public Topics()
        {
            this.Test = new HashSet<Test>();
            this.Topics1 = new HashSet<Topics>();
        }
    
        public int TopicId { get; set; }
        public string TopicName { get; set; }
        public Nullable<int> SubjectId { get; set; }
        public int IsActive { get; set; }
    
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Test> Test { get; set; }
        [System.Diagnostics.CodeAnalysis.SuppressMessage("Microsoft.Usage", "CA2227:CollectionPropertiesShouldBeReadOnly")]
        public virtual ICollection<Topics> Topics1 { get; set; }
        public virtual Topics Topics2 { get; set; }
    }
}