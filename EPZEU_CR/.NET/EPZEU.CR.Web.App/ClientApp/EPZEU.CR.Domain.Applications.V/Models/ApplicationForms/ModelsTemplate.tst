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
        return new  List<string>() {  "object", "List", "{ [key: string]: any[]; }"};
    }
    
    string WriteClass(Class classToWrite)
    {        
        string classJS = @"{0}
@TypeSystem.typeDecorator('{1}', moduleContext.moduleName)
export class {1} extends {2} {{ {3}

    constructor(obj?: any){{
        super(obj)

        this.copyFrom(obj);
    }}
}}"; 

        string comment = classToWrite.DocComment != null && !string.IsNullOrEmpty(classToWrite.DocComment.Summary) ? "\r\n/**" + classToWrite.DocComment.Summary + "*/" : "";
        string name = classToWrite.Name;
        string baseClassName = BaseClassName(classToWrite);
        string properties = WriteProperties(classToWrite);

        return string.Format(classJS, comment, name, baseClassName, properties);
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
                propertiesJS += WriteProperty(prop);
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

    string WriteProperty(Property property)
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
                             IsPropField(property) ? "fields." + property.Type.Name : property.Type.Name, 
                             property.Type.Default(),
                             Decorator(property)); 
    }

    bool IsPropField(Property property)
    {
        if(property.Type.BaseClass != null)
        {
            var cls = property.Type.BaseClass;

            while(cls != null)
            {
                if(cls.Name == "RecordField" || cls.Name == "CompositeField")
                {
                    return true;
                }

                cls = cls.BaseClass;
            }
        }

        return false;
    }

    string Decorator(Property property){
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
        else
        {
            return string.Format(decorator, IsPropField(property) ? "fields." + property.Type.ClassName() : property.Type.ClassName() + " ? " + property.Type.ClassName() + " : moduleContext.moduleName + '.' + '" + property.Type.ClassName() + "'");
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
import { observable } from 'mobx'
import { TypeSystem, BaseDataModel } from 'Cnsys.Core'
import { ApplicationFormFieldsBase } from 'EPZEU.CR.Domain'
import { moduleContext } from '../../ModuleContext'
import * as fields from '../Fields/ModelsAutoGenerated'

$Classes(c=>(c.Namespace == "EPZEU.CR.Domain.ApplicationForms" && 
                (c.Name == "ApplicationFormVFieldsBase" ||
                 c.Name == "V1Fields" ||
                 c.Name == "V21Fields" ||
                 c.Name == "V22Fields" ||
                 c.Name == "V23Fields" ||
                 c.Name == "V24Fields" ||
                 c.Name == "V25Fields" ||
                 c.Name == "V26Fields" ||
                 c.Name == "V31Fields" ||
                 c.Name == "V32Fields" ||
                 c.Name == "V33Fields"||
                 c.Name == "DraftDeedInfo")))[
$WriteClass]






