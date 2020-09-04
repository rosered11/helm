# Helm

## Helm Function

### These indent and nindent

**`indent`** these are function define space in template file.

**Example:**

`{{ include "name-template" . | indent 4 }}`

- `include` is function include template into file.

- `|` use for call chain function for this case. 
    1. Include template to this line.
    2. Define space 4 time.
- - -

**When use `indent`. You must new line for this function**

**Example:**

```yaml
label:
    {{ include "name-template" . | indent 4 }}
```

**When use `nindent`. You don't need to new line for this function**

**Example:**

```yaml
label: {{ include "name-template" . | nindent 4 }}
```

### These with an toYaml

Function `with` use when need to check the value before used, that it usually use with function `toYaml`

**Example:**

In this case it will check value annotations before if it has value. It will map values in key `annotations:` but if noting it will not mapping `annotations:`

```yaml
labels:
    name: my-name
  {{- with .Values.annotations }}
    annotations:
    {{- toYaml . | nindent 4 }}
  {{- end }}
```

- - -

## Helm Flow

`_helpers.tpl` this file is all customize function in helm.
Almost it is called via the function `include`

**Example:**

**File _helpers.tpl**

This is define function `myservice.name`. If call `myservice.name` it will define value of `.Chart.Name` is the value of key `name` in file `values.yaml`

```
{{- define "myservice.name" -}}
{{- default .Chart.Name .Values.name }}
{{- end }}
```

**File template call the customise function**

```yaml
name: {{ include "myservice.name" . }}
```

`values.yaml` this file keep values for use in the template. Almost it is called via function `.Values`

**Example:**

**File `values`**

```yaml
Ralicas: 3
```

**File template call value**

```yaml
replicas: {{ .Values.Ralicas }}
```

## Other Content

-  Kubernetes on Local [[link](./kubernate)]

## Remark

If I mistake or clarify wrong. I apologize. I just start to learning. You can comment for the content is wrong. Thank for read my content.