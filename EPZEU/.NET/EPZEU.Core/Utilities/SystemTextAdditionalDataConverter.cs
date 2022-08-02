using System;
using System.Collections.Generic;
using System.Text.Json;

namespace EPZEU.Utilities
{
    public class AdditionalData : Dictionary<string, string> { }

    public class SystemTextAdditionalDataConverter : System.Text.Json.Serialization.JsonConverter<AdditionalData>
    {
        public override AdditionalData Read(ref System.Text.Json.Utf8JsonReader reader, Type typeToConvert, System.Text.Json.JsonSerializerOptions options)
        {
            if (reader.TokenType != System.Text.Json.JsonTokenType.StartObject)
            {
                throw new System.Text.Json.JsonException();
            }

            AdditionalData value = new AdditionalData();

            var _valueConverter = (System.Text.Json.Serialization.JsonConverter<string>)options
                   .GetConverter(typeof(string));

            while (reader.Read())
            {
                if (reader.TokenType == System.Text.Json.JsonTokenType.EndObject)
                {
                    return value;
                }

                // Get the key.
                if (reader.TokenType != System.Text.Json.JsonTokenType.PropertyName)
                {
                    throw new JsonException();
                }

                string key = reader.GetString();

                // Get the value.
                string v = null;

                reader.Read();

                if (reader.TokenType == System.Text.Json.JsonTokenType.Number)
                {
                    v = reader.GetInt64().ToString();
                }
                if (reader.TokenType == System.Text.Json.JsonTokenType.String)
                {
                    v = reader.GetString();
                }
                if (reader.TokenType == System.Text.Json.JsonTokenType.True)
                {
                    v = true.ToString();
                }
                if (reader.TokenType == System.Text.Json.JsonTokenType.False)
                {
                    v = false.ToString();
                }

                // Add to dictionary.
                value.Add(key, v);
            }

            return null;
        }

        public override void Write(System.Text.Json.Utf8JsonWriter writer, AdditionalData value, System.Text.Json.JsonSerializerOptions options)
        {
            var _valueConverter = (System.Text.Json.Serialization.JsonConverter<string>)options
                   .GetConverter(typeof(string));

            writer.WriteStartObject();

            foreach (KeyValuePair<string, string> kvp in value)
            {
                writer.WritePropertyName(kvp.Key.ToString());

                if (_valueConverter != null)
                {
                    _valueConverter.Write(writer, kvp.Value, options);
                }
                else
                {
                    System.Text.Json.JsonSerializer.Serialize(writer, kvp.Value, options);
                }
            }

            writer.WriteEndObject();
        }
    }
}
