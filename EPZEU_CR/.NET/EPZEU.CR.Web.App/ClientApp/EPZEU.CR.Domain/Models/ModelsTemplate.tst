﻿${ 
    // Enable extension methods by adding using Typewriter.Extensions.*
    using Typewriter.Extensions.Types;

    // Uncomment the constructor to change template settings.
    Template(Settings settings)
    {
        settings.OutputFilenameFactory= OutputFilenameFactory;    
    }

    string OutputFilenameFactory(File file)
    {
        return "ModelsAutoGenerated";
    }
            
    List<string> BaseClasses()
    {
        return new  List<string>() {  "object", "List", "{ [key: string]: any[]; }", "number[]"};
    }
    
    string WriteClass(Class classToWrite)
    {        
        string classJS = @"{0}
@TypeSystem.typeDecorator('{5}', moduleContext.moduleName)
export class {1} extends {2} {{ {3}

    constructor(obj?: any){{
        super(obj)
        
        this.copyFrom(obj);{4}       
    }}
}}"; 

        string comment = classToWrite.DocComment != null && !string.IsNullOrEmpty(classToWrite.DocComment.Summary) ? "\r\n/**" + classToWrite.DocComment.Summary + "*/" : "";
        string name = ClassName(classToWrite);
        string baseClassName = BaseClassName(classToWrite);
        string properties = WriteProperties(classToWrite);
        string fieldIdentConsts = classToWrite.Constants != null && classToWrite.Constants.Any(c=>c.Name == "FieldIdentCode") ? 
            string.Format("\r\n\t\tthis.fieldIdent = '{0}';", classToWrite.Constants.First(c=>c.Name == "FieldIdentCode").Value) : "";

        return string.Format(classJS, comment, name, baseClassName, properties, fieldIdentConsts, classToWrite.Name);
    }

    string ClassName(Class cls)
    {
        if(cls.Name == "ApplicationWithFieldsFormBase")
        {
            return cls.Name + "<T extends ApplicationFormFieldsBase>";
        }
        else
        {
            return cls.Name;
        }
    }

    string BaseClassName(Class cls)
    {
        if(cls.BaseClass != null && !BaseClasses().Any(baseClass=>baseClass == cls.BaseClass.Name))
        {
            return cls.BaseClass.Name;
        }
        else
        {
            return "BaseDataModel";
        } 
    }

    string WriteProperties(Class cls)
    {
        string propertiesJS = "";

        foreach(var prop in cls.Properties)
        {
            if(!IsParentHasProp(prop, cls) && !prop.Attributes.Any(a=>a.Name == "JsonIgnore"))
            {            
                propertiesJS += WriteProperty(prop, cls);
            }
        }

        return propertiesJS;
    }

    bool IsParentHasProp(Property property, Class cls)
    {
        if(cls.BaseClass != null)
        {
            if(cls.BaseClass.Properties.Any(p=>p.Name == property.Name))
            {
                return true;
            }

            return IsParentHasProp(property, cls.BaseClass);
        }

        return false;
    }

    string WriteProperty(Property property, Class cls)
    {
        string propJS;

        if(property.Type.ClassName() == "Date")
        {
            propJS = @"
    
    @observable private _{1}: moment.Moment = null;
    {0}
    @TypeSystem.propertyDecorator('moment')
    public set {1}(val: moment.Moment){{
        this._{1} = val;
    }}
    {0}
    public get {1}(): moment.Moment{{
        return this._{1};
    }} ";
        }
        else if(BaseClasses().Contains(property.Type.ClassName()))
        {
            propJS = @"
                
    @observable private _{1}: any = null;
    {0}
    @TypeSystem.propertyDecorator('any')
    public set {1}(val: any){{
        this._{1} = val;
    }}
    {0}
    public get {1}(): any{{
        return this._{1};
    }} ";
        }
        else
        {
            propJS = @"

    @observable private _{1}: {2} = null;
    {0}
    {4}
    public set {1}(val: {2}){{
        this._{1} = val;
    }}
    {0}
    public get {1}(): {2}{{
        return this._{1};
    }}
    {0} ";
        }

        string comment = "";
        try
        {
            if(property.DocComment != null && !string.IsNullOrEmpty(property.DocComment.Summary))
            {
                comment = "\r\n\t/**" + property.DocComment.Summary + "*/";
            }
        }
        catch (Exception)
        {}
         
        return string.Format(propJS,
                             comment,                            
                             property.name,                                                          
                             cls.Name == "ApplicationWithFieldsFormBase" && property.Name == "Fields" ? "T" : property.Type.Name, 
                             property.Type.Default(),
                             Decorator(property, cls)); 
    }

    string Decorator(Property property, Class cls){
        var decorator = "";
        if(property.Type.IsEnumerable)
        {
            decorator = "@TypeSystem.propertyArrayDecorator({0})";
        }
        else
        {
            decorator = "@TypeSystem.propertyDecorator({0})";
        }

        if(property.Type.ClassName() == "number" ||
           property.Type.ClassName() == "string" ||
           property.Type.ClassName() == "boolean" ||
           property.Type.ClassName() == "any")
        {
            return string.Format(decorator,"'" + property.Type.ClassName()+ "'");
        }
        else if(cls.Name == "ApplicationWithFieldsFormBase" && property.Name == "Fields")
        {
            return string.Format(decorator, "ApplicationFormFieldsBase ? ApplicationFormFieldsBase : moduleContext.moduleName + '.' + 'ApplicationFormFieldsBase'");
        }
        else
        {
            return string.Format(decorator, property.Type.ClassName() + " ? " + property.Type.ClassName() + " : moduleContext.moduleName + '.' + '" + property.Type.ClassName() + "'");
        }
    }

    string WriteEnum(Enum enumToWrite){
        
        string enumJS = @"
{0}
export enum {1} {{ {2}
 }}
TypeSystem.registerEnumInfo({1} , '{1}' , moduleContext.moduleName)";
        
        string comment = "";
        try
        {
            if(enumToWrite.DocComment != null && !string.IsNullOrEmpty(enumToWrite.DocComment.Summary))
            {
                comment = "\r\n/**" + enumToWrite.DocComment.Summary + "*/";
            }
        }
        catch (Exception)
        {}
           
        string name = enumToWrite.Name;        
        string values = WriteEnumValues(enumToWrite);

        return string.Format(enumJS, comment, name, values);
    }

    string WriteEnumValues(Enum enumToWrite){
        string enumValues = "";

        foreach(var value in enumToWrite.Values)
        {
            string comment = "";
            try
            {
                if(value.DocComment != null && !string.IsNullOrEmpty(value.DocComment.Summary))
                {
                    comment = "\r\n\t/**" + value.DocComment.Summary + "*/";
                }
            }
            catch (Exception)
            {}

            string enumValue = @"
    {0}
    {1} = {2},";

            enumValues += string.Format(enumValue, comment, value.Name, value.Value);
        }

        return enumValues;
    }
}

// Auto Generated Object
import * as moment from 'moment'
import { observable, computed } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { moduleContext } from '../ModuleContext'
import { Person } from './Person'
import { Address } from './Address'
import { LegalForms, DeedStatuses, SubDeedStatuses, ApplicationFormTypes, SubUICTypes, ElementHolderAdditionFlags, CompanyNameSuffixFlags, FieldOperations, EraseOperations } from 'EPZEU.CR.Core'

$Enums(c=>(c.Namespace == "EPZEU.CR.ApplicationProcesses.Models" &&
            (c.Name == "ProcessStatuses"))     
)[
$WriteEnum]

$Enums(c=>(c.Namespace == "EPZEU.CR.Domain.ApplicationForms" &&
            (c.Name == "ProcessStates"))     
)[
$WriteEnum]

$Enums(c=>(c.Namespace == "EPZEU.CR.Domain.Fields.Common" &&
            (c.Name == "RecordOperations" ||
            c.Name == "IndentTypes" ||
            c.Name == "PersonType"))     
)[
$WriteEnum]

$Enums(c=>(c.Namespace == "EPZEU.CR.Domain.Common" && 
            c.Name == "EuropeanEconomicInterestRepresenterTypes")     
)[
$WriteEnum]


$Classes(c=>(c.Namespace == "EPZEU.CR.Domain.Common" && 
                (c.Name == "ApplicantExchange" ||
                 c.Name == "ApplicantInfo" ||
                 c.Name == "Applicant" ||
                 c.Name == "ApplicantCapacity" ||
                 c.Name == "Applicants" ||
                 c.Name == "ApplicantRepresentative")))[
$WriteClass]


$Classes(c=>(c.Namespace == "EPZEU.CR.Domain.Fields.Common" &&  
                (c.Name == "Record" ||
                 c.Name == "RecordField" ||
                 c.Name == "Contacts" ||
                 c.Name == "BulstatDeed" ||
                 c.Name == "CompositeField" ||
                 c.Name == "TextRecordField" || 
                 c.Name == "SeatRecordField" ||
                 c.Name == "CheckRecordField" ||
                 c.Name == "ActivityNKIDField" ||
                 c.Name == "BirthPlace" ||               
                 c.Name == "Branch" ||
                 c.Name == "Price" ||
                 c.Name == "Mandate" ||
                 c.Name == "MannerRecordHolder" ||
                 c.Name == "Passport" ||
                 c.Name == "ForeignAuthority" ||
                 c.Name == "ForeignCompanyBaseData" ||
                 c.Name == "Deputy")))[
$WriteClass]

$Classes(c=>(c.Namespace == "EPZEU.CR.Domain.Fields"&&
            (c.Name == "F001_UIC" ||
             c.Name == "F002_Company" ||
             c.Name == "F003_LegalForm" ||
             c.Name == "F004_Transliteration" ||
             c.Name == "F051a_BranchFirm" ||
             c.Name == "UIC" ||
             c.Name == "F005_Seat")))[
$WriteClass]

$Classes(c=>(c.Namespace == "EPZEU.CR.Domain.ApplicationForms" && 
                (c.Name == "ApplicationFormFieldsBase" ||
                 c.Name == "ApplicationWithFieldsForm" ||
                 c.Name == "ApplicationWithFieldsFormBase" ||  
                 c.Name == "ApplicationFormBase" ||
                 c.Name == "RequestForCertificateBase" ||
                 c.Name == "ApplicantInfo")))[
$WriteClass]
